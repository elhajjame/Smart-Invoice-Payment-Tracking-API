import Supplier from "../models/supplierModel.js";
import { errorResponse, successResponse } from '../respnses/respons.js'

export const createSupplier = async (req, res) => {
  try {
    const {
      name, contact, email, phone, address
    } = req.body
    console.log(name);
    const newSupplier = await Supplier.create({
      name, contact, email, phone, address,
      userId: req.user._id,
    })

    successResponse(res, 201, newSupplier, 'supplier has been created successfully')

  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal server error');
  };
};

export const getSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findOne({ _id: id, userId: req.user._id });
    console.log(supplier);
    successResponse(res, 200, supplier)
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal server error');
  };
};

export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ userId: req.user._id });
    if (suppliers.length === 0) {
      return errorResponse(res, 404, 'cannot find any suppliers')
    };
    successResponse(res, 200, { suppliers });
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal server error');
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const {
      name, contact, email, phone, address
    } = req.body

    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true })
    successResponse(res, 201, { supplier }, 'the supplier has been updated successfully');

  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal server error');
  }
}

export const deleteSupplier = async (req, res, next) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    successResponse(res, 204, 'the supplier has been deleted successfully');
  } catch (error) {
    console.error(error);
    errorResponse(res, null, 500, 'Internal server error');
  }
};