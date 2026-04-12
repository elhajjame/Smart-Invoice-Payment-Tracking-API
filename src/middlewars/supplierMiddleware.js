import mongoose from "mongoose";
import Supplier from "../models/supplierModel.js";
import { errorResponse } from "../respnses/respons.js";
import { body } from "express-validator";

export const supplierValidation = [
  body("name")
    .notEmpty()
    .withMessage("Supplier name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters")
    .trim(),

  body("contact")
    .optional()
    .trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("enter a valid email"),

  body("phone")
    .optional()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone must be between 6 and 15 digits"),


  body("address")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Address must be less than 50 characters"),
];

export const supplierExist = async (req, res, next) => {

  const { baseUrl } = req;
  let supplierId;

  if (baseUrl.includes("suppliers")) {
    supplierId = req.params.id
  } else if (baseUrl.includes("invoices")) {
    supplierId = req.body.supplierId
  }

  if (!mongoose.Types.ObjectId.isValid(supplierId)) {
    return errorResponse(res, 400, 'invalid id');
  };

  console.log(supplierId);
  const supplier = await Supplier.findById(supplierId);
  if (!supplier) {
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