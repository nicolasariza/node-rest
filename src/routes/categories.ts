import { Router } from 'express';
import { check } from 'express-validator';
import { getCategories, getCategory, postCategories } from '../controllers/categories';
import { validateFields } from '../middlewares/validator-error';
import { validateJWT } from '../middlewares/validator-jwt';
import { categoryExists } from '../helpers/db-validators';


const router = Router();

router.get('/', getCategories);
router.get('/:id', [
    check('id', 'id is invalid').isMongoId(),
    check('id').custom( categoryExists ),
    validateFields
], getCategory);
router.post('/',[
    validateJWT,
    check('name', 'names is required').not().isEmpty(),
    validateFields
], postCategories );

export default router;