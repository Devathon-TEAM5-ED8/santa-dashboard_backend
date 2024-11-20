import express from "express";
import { ScoreController } from "../controllers/scoreController";

const router = express.Router();
const scoreController = new ScoreController();

router.post("/", scoreController.createScore);
router.get("/", scoreController.getAllScores);
router.get("/:id", scoreController.getScoreById);
router.put("/:id", scoreController.updateScore);
router.delete("/:id", scoreController.deleteScore);

export default router;
