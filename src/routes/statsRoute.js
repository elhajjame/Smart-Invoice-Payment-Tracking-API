import { Router } from "express";
import protect from "../middlewars/protectMiddleware.js";
import { invoiceExist } from "../middlewars/invoiceMiddleware.js";
import { dashboard, supplierStats } from "../controller/statsController.js";

const router = Router();

router
  .get('/suppliers/stats/:id', protect, invoiceExist, supplierStats)
  .get('/dashboard', protect, dashboard)