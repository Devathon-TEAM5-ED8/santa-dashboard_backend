import { Request, Response } from 'express';
import { Gps } from "../../database/entities/Gps";

export class GpsController {

    async createGps(req: Request, res: Response) {

        try {
            let params = req.body;

            // return res.status(200).json(params.latitude);

            if (!params.address || !params.searchDate || !params.city) {
                return res.status(422).json({
                    status: 'error',
                    message: 'Faltan datos por enviar',
                });
            } else {
                console.log(params);
                const { latitude, longitude, city, address, searchDate } = params;
                const newGps = Gps.create({ latitude, longitude, city, address, searchDate });
                await newGps.save();

                return res.status(200).json({
                    status: 'success',
                    message: 'Gps creado',
                    newGps
                });

            }

        } catch (error) {
            return res.status(500).json({ message: 'Error al guardar la ubicacion gps', error });
        }

    }

    async getAllGps(req: Request, res: Response) {
        try {
            const gps = await Gps.find();
            return res.status(200).json({
                status: 'success',
                gps
            });
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el listado de ubicaciones', error });
        }
    }

    async getLastFiveLocations(req: Request, res: Response) {
        try {
            const gps = await Gps.find({
                order: {
                    id: 'DESC'
                },
                take: 5
            });

            return res.status(200).json({
                status: 'success',
                gps
            });
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el listado de ubicaciones', error });
        }
    }

    async getGpsById(req: Request, res: Response) {

        try {
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
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener la ubicación', error });
        }

    }

    async updateGps(req: Request, res: Response) {

        try {
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

        } catch (error) {
            return res.status(500).json({ message: 'Error al editar la ubicación gps', error });
        }

    }

    async deleteGps(req: Request, res: Response) {

        try {
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
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar la ubicación gps', error });
        }

    }



}
