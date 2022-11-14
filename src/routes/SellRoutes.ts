import BaseRoute from "./BaseRoutes";
import SellController from "../controllers/SellController";
import { validateCreateSell} from "./../middlewares/SellValidator"

class SellRoutes extends BaseRoute {
  public routes(): void {
    this.router.get("/", SellController.index)
    this.router.post("/", validateCreateSell ,SellController.create)
    this.router.get("/:id", SellController.show)
    this.router.put("/:id", SellController.update)
    this.router.delete("/:id", SellController.delete)
  }
}

export default new SellRoutes().router