import { Request, Response } from "express";
import { Reindeer } from "../database/entities/Reindeer";

export class ReindeerController {
  async getAllReindeer(req: Request, res: Response) {
    try {
      const reindeer = await Reindeer.find({
        select: ["name", "currentPosition", "quality"],
        order: { currentPosition: "ASC" },
      });
      if (!reindeer) {
        return res.status(404).json({
          message: "No se encontraron renos",
        });
      }
      return res.json(reindeer);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Error al obtener los renos",
          error: error.message,
        });
      }
    }
  }
}
