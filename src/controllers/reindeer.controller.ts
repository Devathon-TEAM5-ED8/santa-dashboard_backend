import { Request, Response } from "express";
import { Reindeer } from "../database/entities/Reindeer";
import { format } from "date-fns";
import { MoreThan } from "typeorm";

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
  async getReindeerById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const reindeer = await Reindeer.findOneBy({ id: parseInt(id) });
      if (!reindeer) {
        return res.status(404).json({
          message: "No se encontró el reno",
        });
      }
      const resp = {
        name: reindeer.name,
        currentPosition: reindeer.currentPosition,
        quality: reindeer.quality,
        creationDate: format(reindeer.creationDate, "yyyy-MM-dd HH:mm:ss"),
      };
      return res.json(resp);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Error al obtener los datos del reno",
          error: error.message,
        });
      }
    }
  }
  async getCurrentAlignment(req: Request, res: Response) {
    try {
      const reindeer = await Reindeer.find({
        select: ["id", "name", "currentPosition"],
        order: { currentPosition: "ASC" },
      });
      if (!reindeer) {
        return res.status(404).json({
          message: "No se encontraron renos",
        });
      }

      const resp = reindeer.map((r) => {
        return {
          idReindeer: r.id,
          nameReindeer: r.name,
          position: r.currentPosition,
        };
      });
      return res.json(resp);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Error al obtener la alineación actual",
          error: error.message,
        });
      }
    }
  }
  async updateAlignment(req: Request, res: Response) {
    try {
      if (req.body.length < 9) {
        return res.status(400).json({
          message: "La lista de renos debe contener 9 elementos",
        });
      }
      for (let i = 0; i < req.body.length; i++) {
        const reindeerUpdate = await Reindeer.findOneBy({
          id: req.body[i].idReindeer,
        });

        if (reindeerUpdate) {
          reindeerUpdate.currentPosition = 1000 + i;
          await reindeerUpdate.save();
        }
      }

      const reindeerList = req.body;
      for (let i = 0; i < reindeerList.length; i++) {
        const reindeer = await Reindeer.findOneBy({
          id: reindeerList[i].idReindeer,
        });

        if (!reindeer) {
          return res.status(404).json({
            message: "No se encontró el reno",
          });
        }
        reindeer.currentPosition = reindeerList[i].newPosition;
        await reindeer.save();
      }

      const reindeerPosition = await Reindeer.find({
        where: {
          currentPosition: MoreThan(100),
        },
      });

      // repasa por si un reno se quedo con la posición random
      if (reindeerPosition.length > 0) {
        for (let i = 0; i < reindeerPosition.length; i++) {
          const reindeerNewPosition = reindeerList.find(
            (r: any) => r.idReindeer === reindeerPosition[i].id
          );
          reindeerPosition[i].currentPosition = reindeerNewPosition.newPosition;
          await reindeerPosition[i].save();
        }
      }
      return res.json({
        message: "Alineación actualizada",
        status: 200,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Error al actualizar la alineación",
          error: error.message,
        });
      }
    }
  }
}
