import mongoose from "mongoose";
import validator from 'validator'

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Supplier name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      // validate: [validator.isAlpha, 'please enter a valid name']
    },

    contact: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'please enter a valid email']

    },

    phone: {
      type: String,
      trim: true,
      validate: [validator.isInt, 'please enter a valid number']
    },

    address: {
      type: String,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
);


const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;