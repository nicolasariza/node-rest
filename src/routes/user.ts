import { Router } from 'express';
import { getUsers } from '../controllers/users';
import { postUsers } from '../controllers/users';
import { putUsers } from '../controllers/users';
import { deleteUsers } from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.post('/', postUsers);
router.put('/:id', putUsers);
router.delete('/', deleteUsers);

export default router;