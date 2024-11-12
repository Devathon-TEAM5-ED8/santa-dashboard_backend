import { Request, Response } from "express";
import { Elves } from "../database/entities/Elves";

export class ElvesController {
    static async getAll(req: Request, res: Response) {
        try {
            const elves = await Elves.find();
            res.status(200).json(elves);
        } catch (error) {
            res.status(500).json({ message: "Error fetching elves", error });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const elf = await Elves.findOneBy({ id: parseInt(req.params.id) });
            if (elf) {
                res.status(200).json(elf);
            } else {
                res.status(404).json({ message: "Elf not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error fetching elf", error });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const newElf = Elves.create(req.body);
            await newElf.save();
            res.status(201).json(newElf);
        } catch (error) {
            res.status(500).json({ message: "Error creating elf", error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const elf = await Elves.findOneBy({ id: parseInt(req.params.id) });
            if (elf) {
                Elves.merge(elf, req.body);
                await elf.save();
                res.status(200).json(elf);
            } else {
                res.status(404).json({ message: "Elf not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating elf", error });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const result = await Elves.delete(parseInt(req.params.id));
            if (result.affected) {
                res.status(200).json({ message: "Elf deleted" });
            } else {
                res.status(404).json({ message: "Elf not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting elf", error });
        }
    }
}
