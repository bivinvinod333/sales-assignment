import * as mongoose from 'mongoose';


export const RetailerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  checkIn: {
    type: String,
    required: true,
  },

  checkOut: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });
