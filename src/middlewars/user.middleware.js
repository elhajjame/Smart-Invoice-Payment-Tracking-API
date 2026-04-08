import { body, validationResult } from 'express-validator';

export const userValidation = [
  body("name").notEmpty().withMessage("The name is required"),
  body("email").isEmail().withMessage("The email must be a valid email"),
  body("password").notEmpty().withMessage("The password is required"),

  body("passwordConfirm").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Password confirm is not correct");
    }
    return true;
  }),
  body("role")
    .isIn(["admin", "client"])
    .withMessage(
      "The role is required and must be either 'admin' or 'client'"
    ),
];
