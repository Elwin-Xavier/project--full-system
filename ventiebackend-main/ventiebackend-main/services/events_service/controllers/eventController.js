import Event from '../models/Event.js';
import DeletedEvent from '../models/DeletedEvent.js';
import uploadToS3 from '../../../utils/fileUpload.js';
import User from '../../auth_service/models/user.model.js';
import mongoose from 'mongoose';
import { sendEventEmailToAllUsers } from '../../../utils/emailService.js'; 

export const createEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.userType !== 1) {
      return res.status(403).json({ message: 'You must be an event creator to perform this action' });
    }

    const {
      eventName, LocationURL, date, time, venue, guest, description,
      price_VVIP, price_VIP, price_GroupofFive, price_Regular, price_Early_bird,
      Total_Tickets_Regular, Total_Tickets_VIP, Total_Tickets_VVIP,
      Early_Bird_Count
    } = req.body;
    
    if (!date || !time || !venue || !guest || !description || !req.file) {
      return res.status(400).json({ message: 'All required fields including poster must be provided' });
    }

    const parsedEvent = {
      eventName,
      LocationURL,
      date: new Date(date),
      time,
      venue,
      guest,
      description,
      price_VVIP: price_VVIP ? parseFloat(price_VVIP) : undefined, 
      price_VIP: price_VIP ? parseFloat(price_VIP) : undefined, 
      price_Regular: price_Regular ? parseFloat(price_Regular) : undefined,
      price_Early_bird: price_Early_bird ? parseFloat(price_Early_bird) : undefined,
      price_GroupofFive: price_GroupofFive ? parseFloat(price_GroupofFive) : undefined,
      Total_Tickets_Regular: parseInt(Total_Tickets_Regular), 
      Total_Tickets_VIP: Total_Tickets_VIP ? parseInt(Total_Tickets_VIP) : undefined, 
      Total_Tickets_VVIP: Total_Tickets_VVIP ? parseInt(Total_Tickets_VVIP) : undefined,
      Early_Bird_Count: parseInt(Early_Bird_Count),
      createdBy: userId
    };

    const posterUrl = await uploadToS3(req.file);
    parsedEvent.poster = posterUrl;

    const event = new Event(parsedEvent);

    await event.save();

    const users = await User.find({}, 'email');

    await sendEventEmailToAllUsers(event, users);

    res.status(201).json({ status: '200', message: 'Event created' });
  } catch (error) {
    console.error('Error in createEvent:', error);
    res.status(500).json({ error: 'An error occurred while creating the event' });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort('-date');
    res.json({ status: '200', events });
  } catch (error) {
    console.error('Error in getAllEvents:', error);
    res.status(500).json({ error: 'An error occurred while fetching events' });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ status: '200', event });
  } catch (error) {
    console.error('Error in getEventById:', error);
    res.status(500).json({ error: 'An error occurred while fetching the event' });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const events = await Event.find({ createdBy: userId })
      .sort({ date: -1 })
      .select('-__v');

    if (events.length === 0) {
      return res.status(200).json({ message: 'No events found for this user', events: [] });
    }

    res.status(200).json({Status:'200',events});
  } catch (error) {
    console.error('Error in getUserEvents:', error);
    res.status(500).json({ error: 'An error occurred while fetching user events' });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'You do not have permission to delete this event' });
    }

    // Create a new DeletedEvent document
    const deletedEvent = new DeletedEvent({
      originalEventId: event._id,
      deletedBy: userId,
      ...event.toObject()
    });

    // Save the DeletedEvent
    await deletedEvent.save();

    // Remove the event from the Event collection
    await Event.findByIdAndDelete(eventId);

    res.json({ status: '200', message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error in moveToDeletedEvent:', error);
    res.status(500).json({ error: 'An error occurred while moving the event to DeletedEvent' });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this event' });
    }

    const updateFields = [
      'eventName', 'LocationURL', 'date', 'time', 'venue', 'guest', 'description',
      'price_VVIP', 'price_VIP', 'price_Regular', 'price_Early_bird',
      'Total_Tickets_Regular','Early_Bird_Count', 'price_GroupofFive', 'Total_Tickets_VIP', 'Total_Tickets_VVIP'
    ];

    const updateData = {};
    updateFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    ['price_VVIP','price_GroupofFive', 'price_VIP', 'price_Regular', 'price_Early_bird'].forEach(field => {
      if (updateData[field]) {
        updateData[field] = parseFloat(updateData[field]);
      }
    });

    ['Total_Tickets_Regular', 'Total_Tickets_VIP', 'Total_Tickets_VVIP','Early_Bird_Count'].forEach(field => {
      if (updateData[field]) {
        updateData[field] = parseInt(updateData[field]);
      }
    });

    if (req.file) {
      const posterUrl = await uploadToS3(req.file);
      updateData.poster = posterUrl;
    }

    await Event.findByIdAndUpdate(eventId, updateData, { new: true });

    res.status(200).json({ status: '200', message: 'Event updated' });
  } catch (error) {
    console.error('Error in updateEvent:', error);
    res.status(500).json({ error: 'An error occurred while updating the event' });
  }
};
