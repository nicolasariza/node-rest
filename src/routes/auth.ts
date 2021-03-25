import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth';
import { validateFields } from '../middlewares/validator-error';

const router = Router();

router.post('/login', [
    check('email', 'email is invalid').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
], login);

export default router;