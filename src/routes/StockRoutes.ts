import BaseRoute from "./BaseRoutes";
import StockController from "../controllers/StockController";
import {validateCreateStock} from "./../middlewares/StockValidator"

class StockRoutes extends BaseRoute {
  public routes(): void {
    this.router.get("/", StockController.index)
    this.router.post("/", validateCreateStock ,StockController.create)
    this.router.get("/:id", StockController.show)
    this.router.put("/:id", StockController.update)
    this.router.delete("/:id", StockController.delete)
  }
}

export default new StockRoutes().router