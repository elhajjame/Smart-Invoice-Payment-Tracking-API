import Payment from "../models/paymentModel.js";
import { errorResponse, successResponse } from "../respnses/respons.js";
import Invoice from "../models/invoiceModel.js";

export const makePayment = async (req, res) => {
  try {
    const { id } = req.params

    const invoice = await Invoice.findById(id)

    const { amount } = req.body
    const payment = await Payment.create({
      amount,
      userId: invoice.userId,
      supplierId: invoice.supplierId,
      invoiceId: invoice._id
    });

    invoice.paidAmount += amount
    await invoice.save();

    successResponse(res, 202, payment, `u have paid ${amount} successfully`)
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, 'Internal server error');
  };
};

export const listPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findOne({ id, userId: req.user._id });

    const payment = await Payment.find({
      invoiceId: id,
      userId: req.user._id
    });
    successResponse(res, 200, payment, `all payment this invoice`);

  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, 'Internal server error');
  }
}