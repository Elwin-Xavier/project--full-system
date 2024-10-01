import mongoose from 'mongoose';

const DeletedUserSchema = new mongoose.Schema({
  originalUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: null
  },
  profilePicture: {
    type: String,
    default: null
  },
  userType: {
    type: Number,
    required: true
  },
  deletedAt: {
    type: Date,
    required: true
  }
});

const DeletedUser = mongoose.model('DeletedUser', DeletedUserSchema);

export default DeletedUser;
