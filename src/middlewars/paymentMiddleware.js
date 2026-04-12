import { body } from "express-validator";

export const paymentValidation = [

  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isFloat({ min: 1 })
    .withMessage("amount must be greater than 0"),
];