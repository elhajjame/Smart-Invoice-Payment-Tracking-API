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