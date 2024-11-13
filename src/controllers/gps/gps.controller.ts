import { Request, Response } from 'express';
import { Gps } from "../../database/entities/Gps";

export class GpsController {

    async createGps(req: Request, res: Response) {

        let params = req.body;

        // return res.status(200).json(params.latitude);

        if (!params.address || !params.searchDate) {
            return res.status(422).json({
                status: 'error',
                message: 'Faltan datos por enviar',
            });
        } else {
            console.log(params);
            const { latitude, longitude, address, searchDate } = params;
            const newGps = Gps.create({ latitude, longitude, address, searchDate });
            await newGps.save();

            return res.status(200).json({
                status: 'success',
                message: 'Gps creado',
                newGps
            });

        }

    }

    async getAllGps(req: Request, res: Response) {
        const gps = await Gps.find();
        return res.status(200).json({
            status: 'success',
            gps
        });
    }

    async getGpsById(req: Request, res: Response) {

        const url = req.path;
        const query = url.split('/');
        const id = query[2];

        if (!id) {
            return res.status(422).json({
                status: 'error',
                message: 'debe enviar el id'
            });
        } else {
            const gps = await Gps.findOneBy({ id: parseInt(id) });

            return res.status(200).json({
                status: 'success',
                gps
            });
        }

    }

    async updateGps(req: Request, res: Response) {

        const url = req.path;
        const query = url.split('/');
        const id = query[2];

        if (!id) {
            return res.status(422).json({
                status: 'error',
                message: 'debe enviar el id'
            });
        } else {
            const gps = await Gps.findOneBy({ id: parseInt(id) });

            if (!gps) {
                return res.status(404).json(
                    { message: 'Gps no encontrado' }
                );
            } else {

                Object.assign(gps, req.body);
                await gps.save();

                return res.status(200).json({
                    status: 'success',
                    message: 'Gps editado',
                    gps
                });

            }
        }

    }

    async deleteGps(req: Request, res: Response) {

        const url = req.path;
        const query = url.split('/');
        const id = query[2];

        if (!id) {
            return res.status(422).json({
                status: 'error',
                message: 'debe enviar el id'
            });
        } else {
            const gps = await Gps.findOneBy({ id: parseInt(id) });
            if (!gps) {
                return res.status(404).json(
                    { message: 'Gps no encontrado' }
                );
            } else {

                await gps.remove();

                return res.status(204).send();

            }
        }

    }



}