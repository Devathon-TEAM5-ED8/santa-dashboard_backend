import { Router } from "express";
import { CardController } from "../controllers/card.controller";

const router = Router();

// Rutas para gestionar las cartas
router.get("/", CardController.getAll); // Obtener todas las cartas
router.get("/:id", CardController.getById); // Obtener una carta específica por ID
router.post("/", CardController.create); // Crear una nueva carta
router.put("/:id", CardController.update); // Actualizar una carta por ID
router.delete("/:id", CardController.delete); // Eliminar una carta por ID

export default router;
