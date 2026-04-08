import { Router } from "express";
import { register, login } from "../controller/authController.js";
import { userValidation } from "../middlewars/user.middleware.js";

const router = Router();

router
  .post('/auth/register', userValidation, register)
  .post('/auth/login', login)


export default router  