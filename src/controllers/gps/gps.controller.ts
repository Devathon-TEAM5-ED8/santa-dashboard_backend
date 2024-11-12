import { Gps } from "../../database/entities/Gps";

export class GpsController {

    async createGps(req: any, res: any) {

        let params = req.body;

        if (!params.latitude || !params.longitude || !params.address || !params.searchDate) {
            return res.status(422).json({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        } else {

            const gps = new Gps();
            gps.latitude = params.latitude;
            gps.longitude = params.longitude;
            gps.address = params.address;
            gps.searchDate = params.searchDate;
            gps.save();

            return res.status(200).json({
                status: 'success',
                message: 'Gps creado',
                gps
            });

        }

    }

    async getAllGps(req: any, res: any) {
        const gps = await Gps.find();
        return res.status(200).json({
            status: 'success',
            gps
        });
    }

    async getGpsById(req: any, res: any) {

        const { id } = req.query;

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

    async updateGps(req: any, res: any) {

        const { id } = req.query;

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

                Object.assign(gps, req.params);
                await gps.save();

                return res.status(200).json({
                    status: 'success',
                    message: 'Gps editado',
                    gps
                });

            }
        }

    }

    async deleteGps(req: any, res: any) {

        const { id } = req.query;

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