import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';


export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: 'sales-head',
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

