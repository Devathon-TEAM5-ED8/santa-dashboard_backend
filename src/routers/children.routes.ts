import { Router } from 'express';
import { ChildrenController } from '../controllers/children.controller';

const router = Router();
const controller = new ChildrenController();

router.post('/children', controller.createChild);           // Crear un niño
router.get('/children', controller.getAllChildren);         // Obtener todos los niños
router.get('/children/:id', controller.getChildById);       // Obtener un niño por ID
router.put('/children/:id', controller.updateChild);        // Actualizar un niño
router.delete('/children/:id', controller.deleteChild);     // Eliminar un niño

export default router;