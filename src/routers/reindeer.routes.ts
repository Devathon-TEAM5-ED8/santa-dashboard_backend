import { Router } from "express";
import { ReindeerController } from "../controllers/reindeer.controller";

const router = Router();
const controller = new ReindeerController();

router.get("/reindeerList", controller.getAllReindeer);

export default router;
