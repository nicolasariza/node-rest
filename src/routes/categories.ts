import { Router } from 'express';
import { check } from 'express-validator';
import { getCategories, getCategory, postCategories, putCategories } from '../controllers/categories';
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
    check('name', 'name is required').not().isEmpty(),
    validateFields
], postCategories );
router.put('/:id', [
    validateJWT,
    check('id', 'id is invalid').isMongoId(),
    check('name', 'name is required').not().isEmpty(),
    check('id').custom( categoryExists ),
    validateFields
], putCategories)

export default router;