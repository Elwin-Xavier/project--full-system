import mongoose from 'mongoose';

const DeletedEventSchema = new mongoose.Schema({
  originalEventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  deletedAt: {
    type: Date,
    default: Date.now
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Include all fields from the original Event model
  poster: String,
  date: Date,
  time: String,
  venue: String,
  guest: String,
  LocationURL: String,
  eventName: String,
  description: String,
  price_Regular: Number,
  price_VVIP: Number,
  price_GroupofFive: Number,
  price_VIP: Number,
  price_Early_bird: Number,
  Total_Tickets_Regular: Number,
  Total_Tickets_VVIP: Number,
  Total_Tickets_VIP: Number,
  Early_Bird_Count: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: Date,
  Confirmed: Boolean,
  status: {
    type: String,
    enum: ['open', 'closed']
  }
});

export default mongoose.model('DeletedEvent', DeletedEventSchema);