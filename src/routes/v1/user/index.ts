import express from 'express';
import * as controller from '../../../controller/user/auth';
import * as schema from '../../../validation/common';
import { reqValidator } from '../../../middleware/requestValidator';

const router = express.Router();

router.post('/register', reqValidator(schema.register), controller.register);

export default router;
