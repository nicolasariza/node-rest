import { Router } from 'express';
import { check } from 'express-validator';
import { postCategories } from '../controllers/categories';
import { validateFields } from '../middlewares/validator-error';
import { validateJWT } from '../middlewares/validator-jwt';

const router = Router();

router.post('/',[
    validateJWT,
    check('name', 'names is required').not().isEmpty(),
    validateFields
], postCategories );

export default router;