import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validateCreateStock = [
  check("product").isString().withMessage("Product must be string!"),
  check("amount").isInt().withMessage("Amount must be integer!"),
  check("price").isInt().withMessage("Price must be integer!"),

  (req: Request, res: Response, next : NextFunction) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
      return res.status(422).json({
        error: error.array()
      })
    }
    next()
  }
]

export {validateCreateStock}