import { Request, Response } from "express";
import IController from "./ControllerInterface";
const db = require("./../db/models")
const {Op} = require("sequelize")

class StockController implements IController {
  async index(req: Request, res: Response): Promise<Response> {
    const {page, size, search} = req.query

    const data = await db.stock.findAndCountAll({

      limit: Number(size), 
      offset: Number(page) * Number(size),
      where: {
        product: {
          [Op.like]: `%${search}%`
        }
      }
    }
    )
    return res.json({
      messages: "all data stock",
      data
    })
  }
  async create(req: Request, res: Response): Promise<Response> {
    const {product, amount, price} = req.body

    const data = await db.stock.create({
      product,
      amount,
      price
    })
    return res.json({
      messages: "Create successfully!",
      data
    })
  }
  async show(req: Request, res: Response): Promise<Response> {
    const {id} = req.params
    
    const data = await db.stock.findOne({
      where: {
        id
      }
    })
    return res.json({
      messages: "find one stock",
      data
    })
  }
  async update(req: Request, res: Response): Promise<Response> {
    const {id} = req.params
    const {product, amount, price} = req.body

    await db.stock.update({
      product,
      amount,
      price
    }, {
      where: {
        id
      }
    })
    await db.stock.findOne({
      where: {
        id
      }
    })
    return res.json({
      messages: "update successfully",
    })
  }
  async delete(req: Request, res: Response): Promise<Response> {
    const {id} = req.params

    await db.stock.destroy({
      where: {
        id
      }
    })
    return res.json({
      messages: "delete successfully!"
    })
  }
}

export default new StockController()