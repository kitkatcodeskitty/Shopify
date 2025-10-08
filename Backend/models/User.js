import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  email: {
    unique: true,
    type: String,
    required: true
  },
  password: {
    type: String,
    min: [6, 'Password must be at least 6 characters long'],
    max: [50, 'Password must be less than 50 characters long'],
    required: true
  },
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User'
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;




