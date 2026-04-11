import Invoice from "../models/invoiceModel.js";
import { errorResponse, successResponse } from "../respnses/respons";

export const supplierStats = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.find({
      supplierId: id,
      UserId: req.user._id
    })
    let totalInvoices = invoice.length;
    let totalAmount, totalPaid;

    invoice.forEach(elm => {
      totalAmount = totalAmount + elm.amount;
      totalPaid += elm.paidAmount;
    });

    const remaining = totalAmount - paidAmount;
    const percentagePaid = (totalPaid / totalAmount)
    successResponse(res, 200, {
      totalInvoices,
      totalAmount,
      totalPaid,
      remaining,
      percentagePaid
    });

  } catch (error) {
    console.log(error);
    errorResponse(res, 500, 'Internal server error')
  }
}

export const dashboard = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      UserId: req.user._id
    })

    let totalInvoices = invoices.length;
    let totalExpenses = 0;
    let totalPaid = 0;

    invoices.forEach(inv => {
      totalExpenses += inv.amount;
      totalPaid += inv.paidAmount;
    });
    const remaining = totalExpenses - totalPaid

    successResponse(res, 200, {
      totalInvoices,
      totalExpenses,
      totalPaid,
      remaining
    });
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal server error');
  }
}