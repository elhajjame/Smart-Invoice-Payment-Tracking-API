import Invoice from "../models/invoiceModel.js";
import { errorResponse } from "../respnses/respons.js";
import mongoose from "mongoose";

export const invoiceExist = async (req, res, next) => {

  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 400, 'invalid id');
  };

  const invoice = await Invoice.findById(id);

  if (!invoice) {
    return errorResponse(res, 404, 'invoice not found')
  }
  next();
}

export const paymentCheck = async function (req, res, next) {

  const { id } = req.params;
  let { amount } = req.body;

  amount = Number(amount);
  if (!amount || amount <= 0) {
    return errorResponse(res, 400, 'invalid amount');
  }

  const invoice = await Invoice.findById(id);
  if (invoice.status === 'paid') {
    return errorResponse(res, 400, 'The invoice is already paid');
  }

  const remainingAmount = invoice.amount - invoice.paidAmount;

  if (amount > remainingAmount) {
    return errorResponse(res, 400, `Invalid payment: maximum allowed is ${remainingAmount}`)
  }
  next()
}