import Invoice from '../models/invoiceModel.js';
import Supplier from '../models/supplierModel.js';
import { errorResponse, successResponse } from '../respnses/respons.js'

export const createInvoice = async (req, res) => {
  const {
    amount, paidAmount, status, description, supplierId
  } = req.body

  const supplier = await Supplier.findOne({
    _id: supplierId, userId: req.user._id
  });

  try {

    const newSupplier = await Invoice.create({
      amount, paidAmount, status, description,
      userId: req.user._id, supplierId: supplier._id
    })

    successResponse(res, 201, newSupplier, 'invoice has been created successfully')

  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal server error');
  };
};

export const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findOne({ _id: id, userId: req.user._id });
    console.log(invoice);
    successResponse(res, 200, invoice)
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, 'Internal server error');
  };
};

export const getAllInvoices = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let filter = { userId: req.user._id };
    if (req.query.status) {
      filter.status = req.query.status
    }
    const invoice = await Invoice.find(filter)
      .skip(skip)
      .limit(limit)

    if (invoice.length === 0) {
      return errorResponse(res, 404, 'cannot find any invoice')
    };

    successResponse(res, 200, { invoice });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, 'Internal server error');
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const {
      amount, description
    } = req.body

    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true })
    successResponse(res, 201, { invoice }, 'the supplier has been updated successfully');

  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal server error');
  }
}

export const deleteInvoice = async (req, res, next) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    successResponse(res, 204, 'the invoice has been deleted successfully');
  } catch (error) {
    console.error(error);
    errorResponse(res, null, 500, 'Internal server error');
  }
};