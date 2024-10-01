import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  poster: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  time: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true,
  },
  guest: {
    type: String,
    required: true
  },
  LocationURL: {
    type: String,
    required: true
  },
  eventName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price_Regular: {
    type: Number,
    required: true
  },
  price_VVIP: {
    type: Number,
  },
  price_GroupofFive: {
    type: Number,
  },
  price_VIP: {
    type: Number,
  },
  price_Early_bird: {
    type: Number,
  },
  Total_Tickets_Regular: {
    type: Number,
    required: true
  },
  Total_Tickets_VVIP: {
    type: Number,
  },
  Total_Tickets_VIP: {
    type: Number,
  },
  Early_Bird_Count: {
    type: Number,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  Confirmed: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
    required: true
  }

});

export default mongoose.model('Event', EventSchema);
