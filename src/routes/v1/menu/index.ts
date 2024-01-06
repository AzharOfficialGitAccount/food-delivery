import express from 'express';
import * as menuController from '../../../controller/menu/menu';
import * as schema from '../../../validation/common';
import { reqValidator } from '../../../middleware/requestValidator';
import { verifyAuthToken } from '../../../middleware/auth';

const router = express.Router();

router.post('/menu', reqValidator(schema.menu), verifyAuthToken, menuController.addMenu);
router.get('/get-menu', reqValidator(schema.menuQuery, 'query'), verifyAuthToken, menuController.getMenu);
router.put('/update-menu', reqValidator(schema.menu), verifyAuthToken, menuController.updateMenu);
router.delete('/delete-menu', verifyAuthToken, menuController.deleteMenu);

export default router;
