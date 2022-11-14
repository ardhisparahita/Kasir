import BaseRoute from "./BaseRoutes";
import exportSell from "../controllers/ExcelController";

class ExcelRoutes extends BaseRoute {
  public routes(): void {
    this.router.get("/", exportSell)
  }
}

export default new ExcelRoutes().router