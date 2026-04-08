import mongoose from "mongoose";
import Supplier from "../models/supplierModel.js";
import { errorResponse } from "../respnses/respons.js";

export const supplierExist = async (req, res, next) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    errorResponse(res, 400, 'invalid id');
  };

  const project = await Supplier.findById(id,);

  if (!project) {
    return errorResponse(res, 404, 'supplier not found')
  }
  next();
}

export const ownerShip = async (req, res, next) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) {
    return errorResponse(res, 404, 'Supplier not found');
  }

  if (supplier.userId.toString() !== req.user._id.toString()) {
    return errorResponse(res, 403, 'Access denied — not your resource')
  }
  next();
};