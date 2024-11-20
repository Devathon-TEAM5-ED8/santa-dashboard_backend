import { Router } from 'express';
import { GpsController } from '../../controllers/gps/gps.controller';

const routerGps = Router();
const controller = new GpsController();

routerGps.post('/create', controller.createGps);           // Crear un niño
routerGps.get('/getAll', controller.getAllGps);         // Obtener todos los niños
routerGps.get('/byId/:id', controller.getGpsById);       // Obtener un niño por ID
routerGps.put('/update/:id', controller.updateGps);        // Actualizar un niño
routerGps.delete('/delete/:id', controller.deleteGps);     // Eliminar un niño

export default routerGps;