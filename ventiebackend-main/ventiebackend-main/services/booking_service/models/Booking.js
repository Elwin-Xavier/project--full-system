import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  EventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Ticket_Type: {
    type: String,
    required: true
  },
  QR_info: {
    type: String,
    required: true
  },
  QR_pdf_url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Booking', BookingSchema);
