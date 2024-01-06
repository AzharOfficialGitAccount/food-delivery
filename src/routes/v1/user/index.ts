import express from 'express';
import * as controller from '../../../controller/user/auth';
import * as commonController from '../../../controller/common/common';
import * as schema from '../../../validation/common';
import { reqValidator } from '../../../middleware/requestValidator';
import { verifyAuthToken } from '../../../middleware/auth';

const router = express.Router();

router.post('/register', reqValidator(schema.register), controller.register);
router.post('/login', reqValidator(schema.login), controller.login, commonController.createSession as any);
router.get('/profile', reqValidator(schema.profile), verifyAuthToken, controller.getProfile);
router.put('/profile', reqValidator(schema.profile), verifyAuthToken, controller.updateProfile);
router.delete('/delete-account', verifyAuthToken, controller.deleteAccount);
router.post('/logout', verifyAuthToken, controller.logout);





export default router;
