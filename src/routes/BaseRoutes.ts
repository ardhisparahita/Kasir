import { Router } from "express";
import IRouter from "./RouterIntreface";

abstract class BaseRoute implements IRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  abstract routes(): void;
}

export default BaseRoute