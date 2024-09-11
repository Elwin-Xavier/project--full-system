import Booking from '../models/Booking.js';
import Event from '../../events_service/models/Event.js';
import { sendTicketEmail } from '../../../utils/emailUtils.js';
import Receivable from '../models/Receivable.js';
import User from  '../../auth_service/models/user.model.js'
import { simulatePayment } from '../../../utils/paymentUtils.js';
import { generateToken } from '../../../utils/tokenUtils.js';
import { generateQRCode } from '../../../utils/qrUtils.js';
import { generatePDF } from '../../../utils/pdfUtils.js';
import { uploadToS3 } from '../../../utils/s3PdfUtils.js';


export const purchaseTicket = async (req, res) => {
  try {
    const { EventId, Email, ticket_type, payment_info } = req.body;
    const userId = req.user.id;

    // Retrieve event details
    const event = await Event.findById(EventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { eventName, date: eventDate, venue, time: eventTime, poster: eventPoster } = event;

    // Check ticket availability
    for (const ticket of ticket_type) {
      const { type, quantity } = ticket;

      if (type === 'Early_Bird' && event.Early_Bird_Count < quantity) {
        return res.status(400).json({ message: 'Not enough Early Bird tickets available' });
      } else if (type === 'Regular' && event.Total_Tickets_Regular < quantity) {
        return res.status(400).json({ message: 'Not enough Regular tickets available' });
      } else if (type === 'VIP' && event.Total_Tickets_VIP < quantity) {
        return res.status(400).json({ message: 'Not enough VIP tickets available' });
      } else if (type === 'VVIP' && event.Total_Tickets_VVIP < quantity) {
        return res.status(400).json({ message: 'Not enough VVIP tickets available' });
      } else if (type === 'Group_ofFive' && event.Total_Tickets_Regular < 5) {  
        return res.status(400).json({ message: 'Not enough Regular tickets available for Group of Five' });
      }
    }

    const paymentSuccess = await simulatePayment(payment_info);
    if (!paymentSuccess) {
      return res.status(400).json({ message: 'Payment failed' });
    }

    const bookings = [];
    const pdfUrls = [];
    let totalAmount = 0;

    for (const ticket of ticket_type) {
      const { type, quantity, total_price } = ticket;
      totalAmount += total_price;

      if (type === 'Early_Bird') {
        event.Early_Bird_Count -= quantity;
        event.Total_Tickets_Regular -= quantity;
      } else if (type === 'Regular') {
        event.Total_Tickets_Regular -= quantity;
      } else if (type === 'VIP') {
        event.Total_Tickets_VIP -= quantity;
      } else if (type === 'VVIP') {
        event.Total_Tickets_VVIP -= quantity;
      } else if (type === 'Group_ofFive') {
        event.Total_Tickets_Regular -= 5;
      }

      for (let i = 0; i < quantity; i++) {
        const ticketToken = generateToken(15);
        const qrCodeBuffer = await generateQRCode(ticketToken);
        const pdfBuffer = await generatePDF(eventName, type, eventTime, qrCodeBuffer, eventDate, venue, eventPoster);
        const pdfUrl = await uploadToS3(ticketToken, pdfBuffer);

        const booking = new Booking({
          EventId,
          UserId: userId,
          Ticket_Type: type,
          QR_info: ticketToken,
          QR_pdf_url: pdfUrl,
        });

        await booking.save();
        bookings.push(booking);
        pdfUrls.push(pdfUrl);
      }
    }

    // Save updated ticket counts to the event
    await event.save();

    // Create a single Receivable record for all tickets purchased
    await new Receivable({
      UserId: userId,
      EventId,
      Total_Amount: totalAmount,
      timestamp: new Date(),
    }).save();

    await sendTicketEmail(Email, eventName, pdfUrls);

    res.status(201).json({
      status: '200',
      message: 'Tickets purchased successfully'
    });
  } catch (error) {
    console.error('Error in purchaseTicket:', error);
    res.status(500).json({ error: 'An error occurred while purchasing tickets' });
  }
};


export const getBookingsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bookings = await Booking.find({ UserId: userId }).populate('EventId', 'eventName time date venue');
    //console.log(bookings);
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    const bookingDetails = bookings.map(booking => ({
      eventName: booking.EventId.eventName,
      date: booking.EventId.date,
      venue: booking.EventId.venue,
      Time: booking.EventId.time,
      ticket_type: booking.Ticket_Type,
      QR_pdf_url: booking.QR_pdf_url
    }));

    res.status(200).json({ status: '200', bookings: bookingDetails });
  } catch (error) {
    console.error('Error in geting Bookings:', error);
    res.status(500).json({ error: 'An error occurred while retrieving bookings' });
  }
};
