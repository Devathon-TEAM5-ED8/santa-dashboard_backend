import { Request, Response } from 'express';
import { Children } from '../database/entities/Children';

export class ChildrenController {
    // Crear un nuevo registro
    async createChild(req: Request, res: Response) {
        try {
            const { nameChild, willReceiveGift, rollId } = req.body;
            const newChild = Children.create({ nameChild, willReceiveGift, rollId });
            await newChild.save();
            return res.status(201).json(newChild);
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear el niño', error });
        }
    }

    // Obtener todos los registros
    async getAllChildren(req: Request, res: Response) {
        try {
            const children = await Children.find();
            return res.json(children);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los niños', error });
        }
    }

    // Obtener un registro por ID
    async getChildById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const child = await Children.findOneBy({ id: parseInt(id) });
            if (!child) return res.status(404).json({ message: 'Niño no encontrado' });
            return res.json(child);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el niño', error });
        }
    }

    // Actualizar un registro
    async updateChild(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const child = await Children.findOneBy({ id: parseInt(id) });
            if (!child) return res.status(404).json({ message: 'Niño no encontrado' });
            
            Object.assign(child, req.body);
            await child.save();
            return res.json(child);
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar el niño', error });
        }
    }

    // Eliminar un registro
    async deleteChild(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const child = await Children.findOneBy({ id: parseInt(id) });
            if (!child) return res.status(404).json({ message: 'Niño no encontrado' });
            
            await child.remove();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el niño', error });
        }
    }
}
