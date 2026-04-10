import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema({
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'please enter an amount'],
  },
  paymentDate: {
    type: Date,
    default: () => Date.now(),
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;