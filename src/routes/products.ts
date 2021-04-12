import { Router } from 'express';
import { check } from 'express-validator';
import { deleteProducts, getProduct, getProducts, postProducts, putProducts } from '../controllers/products';
import { categoryExists, productExists } from '../helpers/db-validators';
import { validateFields } from '../middlewares/validator-error';
import { validateJWT } from '../middlewares/validator-jwt';
import { isAdminRole } from '../middlewares/validator-role';


const router = Router();

router.get('/', getProducts);
router.get('/:id', [
    check('id', 'id is invalid').isMongoId(),
    check('id').custom( productExists ),
    validateFields
], getProduct);
router.post('/', [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    check('category', 'category invalid').isMongoId(),
    check('category').custom( categoryExists ),
    validateFields
], postProducts );
router.put('/:id', [
    validateJWT,
    check('id').custom( productExists ),
    validateFields
], putProducts);
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'id is invalid').isMongoId(),
    check('id').custom( productExists ),
    validateFields
], deleteProducts);

export default router;
