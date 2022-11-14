import BaseRoute from "./BaseRoutes";
import AuthController from "../controllers/AuthController";
import {ValidateAuth} from "../middlewares/AuthValidator";

class AuthRoutes extends BaseRoute {
  public routes(): void {
    this.router.post("/login", ValidateAuth ,AuthController.login)
  }
}

export default new AuthRoutes().router