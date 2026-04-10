import { Router } from "express";
import protect from "../middlewars/protectMiddleware.js";
import { supplierExist } from "../middlewars/supplierMiddleware.js";
import { createInvoice, deleteInvoice, getAllInvoices, getInvoice, updateInvoice } from "../controller/invoiceController.js";
import { invoiceExist, paymentCheck } from "../middlewars/invoiceMiddleware.js";
import { listPayment, makePayment } from "../controller/paymnetContriller.js";

const router = Router();

router
  .post('/create', protect, supplierExist, createInvoice)
  .get('/', protect, getAllInvoices)
  .get('/:id', protect, invoiceExist, getInvoice)
  .put('/update/:id', protect, invoiceExist, updateInvoice)
  .delete('/delete/:id', protect, invoiceExist, deleteInvoice)
  .post('/payment/:id', protect, invoiceExist, paymentCheck, makePayment)
  .get('/payment/:id', protect, invoiceExist, listPayment)
export default router