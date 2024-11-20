import { Router } from "express";
import { ReindeerController } from "../controllers/reindeer.controller";

const router = Router();
const controller = new ReindeerController();

router.get("/reindeerList", controller.getAllReindeer);
router.get("/currentAlignment", controller.getCurrentAlignment);
router.get("/:id", controller.getReindeerById);
router.put("/updateAlignment", controller.updateAlignment);

export default router;
