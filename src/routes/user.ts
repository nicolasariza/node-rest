import { Router } from 'express';
import { check } from 'express-validator';
import { getUsers } from '../controllers/users';
import { postUsers } from '../controllers/users';
import { putUsers } from '../controllers/users';
import { deleteUsers } from '../controllers/users';
import { validateFields } from '../middlewares/validator-error';
import { roleExists, emailExists, userExists } from '../helpers/db-validators';

const router = Router();

router.get('/', getUsers);
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password must be at least 6 characters ').isLength({min: 6}),
    check('role', 'role is invalid').custom( roleExists ),
    check('email', 'email is invalid').isEmail(),
    check('email', 'email exists').custom( emailExists ),
    validateFields
], postUsers);
router.put('/:id', [
    check('id', 'id is invalid').isMongoId(),
    check('id').custom( userExists ),
    validateFields
],putUsers);
router.delete('/', deleteUsers);

export default router;