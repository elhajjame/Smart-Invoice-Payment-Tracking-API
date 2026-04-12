import { Router } from "express";
import { register, login, getMe } from "../controller/authController.js";
import { userValidation } from "../middlewars/user.middleware.js";
import protect from "../middlewars/protectMiddleware.js";
import { dataValidation } from "../middlewars/validationMiddleware.js";

const router = Router();

router
  .post('/auth/register', userValidation, dataValidation, register)
  .post('/auth/login', login)
  .get('/get-me', protect, getMe)

export default router