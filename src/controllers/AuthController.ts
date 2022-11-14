import { Request, Response } from "express";
const db = require("./../db/models")

class AuthController {
  login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body
    

    const user = await db.user.findOrCreate({
      where: {
        email,
        password
      }
    })
    return res.json({
        messages: "login successfully!",
        data: user
    })
  }
}

export default new AuthController()