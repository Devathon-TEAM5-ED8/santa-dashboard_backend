import { Router } from "express";
import { ClimateController } from "../controllers/climate.controller";

const router = Router();
const controller = new ClimateController();

router.get("/state", controller.consultStateClima);

export default router;
