import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
const db = require( "./../db/models")

const ValidateAuth = [
  check("email")
  .isString()
  .isEmail()
  .withMessage("Email invalid!")
  .custom(async(email) => {
    const existingEmail = await db.user.findOne({
      where: {
        email
      }
    })
    if( existingEmail) throw new Error("Email already exist!")
  }),

  check("password")
  .isLength({min: 8})
  .withMessage("Password must be more than 8 characters"),

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

export {ValidateAuth}