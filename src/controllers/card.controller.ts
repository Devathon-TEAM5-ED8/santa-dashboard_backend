// Controlador para gestionar las solicitudes y asociar cartas con sus respectivos children
import { Request, Response } from "express";
import { Cards } from "../database/entities/Cards";
import { Children } from "../database/entities/Children";

export class CardController {
    static async getAll(req: Request, res: Response) {
        try {
            const cards = await Cards.find({ relations: ["child"] });
            res.status(200).json(cards);
        } catch (error) {
            res.status(500).json({ message: "Error fetching cards", error });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const card = await Cards.findOne({
                where: { id: parseInt(req.params.id) },
                relations: ["child"]
            });
            if (card) {
                res.status(200).json(card);
            } else {
                res.status(404).json({ message: "Card not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error fetching card", error });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { title, content, childId } = req.body;

            const child = await Children.findOneBy({ id: childId });
            if (!child) {
                return res.status(404).json({ message: "Child not found" });
            }

            const newCard = Cards.create({ title, content, childId });
            await newCard.save();

            res.status(201).json(newCard);
        } catch (error) {
            res.status(500).json({ message: "Error creating card", error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const card = await Cards.findOneBy({ id: parseInt(req.params.id) });
            if (!card) {
                return res.status(404).json({ message: "Card not found" });
            }

            const { title, content, childId } = req.body;

            if (childId) {
                const child = await Children.findOneBy({ id: childId });
                if (!child) {
                    return res.status(404).json({ message: "Child not found" });
                }
            }

            Cards.merge(card, { title, content, childId });
            await card.save();

            res.status(200).json(card);
        } catch (error) {
            res.status(500).json({ message: "Error updating card", error });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const result = await Cards.delete(parseInt(req.params.id));
            if (result.affected) {
                res.status(200).json({ message: "Card deleted" });
            } else {
                res.status(404).json({ message: "Card not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting card", error });
        }
    }
}