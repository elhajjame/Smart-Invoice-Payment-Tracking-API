import { Router } from "express";
import { createSupplier, deleteSupplier, getAllSuppliers, getSupplier, updateSupplier } from "../controller/supplierController.js";
import { ownerShip, supplierExist } from "../middlewars/supplierMiddleware.js";
import protect from "../middlewars/protectMiddleware.js";

const router = Router();

router.use(protect);

router
  .post('/create', createSupplier)
  .get('/get-all', getAllSuppliers)
  .get('/:id', supplierExist, ownerShip, getSupplier)
  .put('/update/:id', supplierExist, ownerShip, updateSupplier)
  .delete('/delete/:id', supplierExist, ownerShip, deleteSupplier)

export default router  