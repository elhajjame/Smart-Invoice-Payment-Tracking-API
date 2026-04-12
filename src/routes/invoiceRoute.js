import { Router } from "express";
import protect from "../middlewars/protectMiddleware.js";
import { ownerShip, supplierExist } from "../middlewars/supplierMiddleware.js";
import { createInvoice, deleteInvoice, getAllInvoices, getInvoice, updateInvoice } from "../controller/invoiceController.js";
import { invoiceExist, invoiceValidation, paymentCheck } from "../middlewars/invoiceMiddleware.js";
import { listPayment, makePayment } from "../controller/paymnetContriller.js";
import { dataValidation } from "../middlewars/validationMiddleware.js";
import { paymentValidation } from "../middlewars/paymentMiddleware.js";

const router = Router();

router
  .post('/create', protect, supplierExist, invoiceValidation, dataValidation, createInvoice)
  .get('/', protect, getAllInvoices)
  .get('/:id', protect, invoiceExist, getInvoice)
  .put('/update/:id', protect, invoiceExist, updateInvoice)
  .delete('/delete/:id', protect, invoiceExist, deleteInvoice)
  .post('/payment/:id', protect, invoiceExist, paymentValidation, dataValidation, paymentCheck, makePayment)
  .get('/payment/:id', protect, invoiceExist, listPayment)
export default router