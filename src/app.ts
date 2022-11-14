import express, { Application, Request, Response } from "express"
import cors from "cors"
import compression from "compression"
import helmet from "helmet"

import AuthRoutes from "./routes/AuthRoutes"
import StockRoutes from "./routes/StockRoutes"
import SellRoutes from "./routes/SellRoutes"
import ExcelRoutes from "./routes/ExcelRoutes"

class App {
  public app: Application

  constructor() {
    this.app = express()
    this.plugins()
    this.routes()
  }

  protected plugins(): void {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(compression())
    this.app.use(helmet())
  }

  protected routes(): void {
    this.app.use("/api/v1/auth", AuthRoutes)
    this.app.use("/api/v1/stock", StockRoutes)
    this.app.use("/api/v1/sell", SellRoutes)
    this.app.use("/api/v1/excel", ExcelRoutes)
  }
  
}

const app = new App().app

export default app