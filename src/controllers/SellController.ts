import { Request, Response } from "express";
import IController from "./ControllerInterface";
const db = require("./../db/models")
const Op = require("sequelize")

class SellController implements IController {
  async index(req: Request, res: Response): Promise<Response> {
    const {page, size, search} = req.query
    const data = await db.sell.findAndCountAll({
      limit: Number(size),
      offset: Number(page) * Number(size),
      include: [{
        model: db.stock,
        as: "stocks",
      }],

    })
    return res.json({
      messages: "all data sell",
      data
    })
  }
  async create(req: Request, res: Response): Promise<Response> {
    const {stock_id, amount, price, date, cash, change, status} = req.body

    const data = await db.sell.create({
      stock_id,
      amount,
      price,
      date,
      cash,
      change,
      status
    })
    return res.json({
      messages: "Create successfully!",
      data
    })
  }
  async show(req: Request, res: Response): Promise<Response> {
    const {id} = req.params

    const data = await db.sell.findOne({
      where: {
        id
      }
    })
    return res.json({
      messages: "get one sell",
      data
    })
  }
  async update(req: Request, res: Response): Promise<Response> {
    const {id} = req.params
    const {stock_id, amount, price, date, cash, change, status} = req.body

    await db.sell.update({
      stock_id,
      amount,
      price,
      date,
      cash,
      change,
      status
    }, {
      where: {
        id
      }
    })
    await db.sell.findOne({
      where: {
        id
      }
    })
    return res.json({
      messages: "update successfully!",
    })
  }
  async delete(req: Request, res: Response): Promise<Response> {
    const {id} = req.params

    await db.sell.destroy({
      where: {
        id
      }
    })
    return res.json({
      messages: "delete successfully!"
    })
  }
}

export default new SellController()