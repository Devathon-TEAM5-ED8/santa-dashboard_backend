import { Router } from "express";
import { ElvesController } from "../controllers/elves.controller";

const router = Router();

router.get("/", ElvesController.getAll);
router.get("/:id", ElvesController.getById);
router.post("/", ElvesController.create);
router.put("/:id", ElvesController.update);
router.delete("/:id", ElvesController.delete);

export default router;
