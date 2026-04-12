import { validationResult } from "express-validator";

export const dataValidation = (req, res, next) => {
  const validation = validationResult(req);

  if (!validation.isEmpty())
    return res.status(422).json({ errors: validation.errors });

  next();
};
