import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validateCreateSell = [
  check("stock_id").isInt().withMessage("Stock id must be integer!"),
  check("amount").isInt().withMessage("Amount must be integer!"),
  check("price").isInt().withMessage("Price must be integer!"),
  check("date").isDate().withMessage("Date must be date!"),
  check("cash").isInt().withMessage("Cash must be integer!"),
  check("change").isInt().withMessage("Change must be integer!"),
  check("status").isString().withMessage("Status must be string!"),
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
      return res.status(422).json({
        error: error.array()
      })
    }
    next()
  }
]

export {validateCreateSell}