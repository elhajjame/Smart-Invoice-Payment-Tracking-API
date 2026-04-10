import { Router } from "express";
import protect from "../middlewars/protectMiddleware.js";
import { supplierExist } from "../middlewars/supplierMiddleware.js";
import { createInvoice, deleteInvoice, getAllInvoices, getInvoice, updateInvoice } from "../controller/invoiceController.js";
import { invoiceExist } from "../middlewars/invoiceMiddleware.js";

const router = Router();

router
  .post('/create', protect, supplierExist, createInvoice)
  .get('/', protect, getAllInvoices)
  .get('/:id', protect, invoiceExist, getInvoice)
  .put('/update/:id', protect, invoiceExist, updateInvoice)
  .delete('/delete/:id', protect, invoiceExist, deleteInvoice)

export default router