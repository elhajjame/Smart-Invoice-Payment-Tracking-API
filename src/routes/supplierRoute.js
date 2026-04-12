import { Router } from "express";
import { createSupplier, deleteSupplier, getAllSuppliers, getSupplier, updateSupplier } from "../controller/supplierController.js";
import { ownerShip, supplierExist, supplierValidation } from "../middlewars/supplierMiddleware.js";
import protect from "../middlewars/protectMiddleware.js";
import { dataValidation } from "../middlewars/validationMiddleware.js";

const router = Router();

router.use(protect);

router
  .post('/create', supplierValidation, dataValidation, createSupplier)
  .get('/get-all', getAllSuppliers, ownerShip)
  .get('/:id', supplierExist, ownerShip, getSupplier)
  .put('/update/:id', supplierExist, ownerShip, updateSupplier)
  .delete('/delete/:id', supplierExist, ownerShip, deleteSupplier)

export default router  