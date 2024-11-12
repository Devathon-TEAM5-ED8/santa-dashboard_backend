import { Request, Response } from "express";
import { Rol } from "../database/entities/Rol";

export class RolController {
    static async getAll(req: Request, res: Response) {
        try {
            const roles = await Rol.find();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: "Error fetching roles", error });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const rol = await Rol.findOneBy({ id: parseInt(req.params.id) });
            if (rol) {
                res.status(200).json(rol);
            } else {
                res.status(404).json({ message: "Role not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error fetching role", error });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const newRol = Rol.create(req.body);
            await newRol.save();
            res.status(201).json(newRol);
        } catch (error) {
            res.status(500).json({ message: "Error creating role", error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const rol = await Rol.findOneBy({ id: parseInt(req.params.id) });
            if (rol) {
                Rol.merge(rol, req.body);
                await rol.save();
                res.status(200).json(rol);
            } else {
                res.status(404).json({ message: "Role not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating role", error });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const result = await Rol.delete(parseInt(req.params.id));
            if (result.affected) {
                res.status(200).json({ message: "Role deleted" });
            } else {
                res.status(404).json({ message: "Role not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting role", error });
        }
    }
}
