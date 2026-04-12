import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    remainingAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["unpaid", "partially_paid", "paid"],
      default: "unpaid",
    },

    description: {
      type: String,
      trim: true,
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

invoiceSchema.pre("save", function () {
  if (this.paidAmount === 0) {
    this.status = "unpaid";
  } else if (this.paidAmount < this.amount) {
    this.status = "partially_paid";
  } else if (this.paidAmount >= this.amount) {
    this.status = "paid";
  }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;