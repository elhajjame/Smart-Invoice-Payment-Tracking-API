import { Router } from "express";
import { register, login } from "../controller/authController.js";

const router = Router();

router
  .post('/auth/register', register)
  .post('/auth/login', login)


export default router  