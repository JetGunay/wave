import express from 'express';
import {
  showUsers,
  showUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.js';
import {
  showQAs,
  showQAById,
  createQA,
  // createQALog
} from '../controllers/qa.js';

//init express router
const router = express.Router();

router.get('/users', showUsers);
router.get('/users/:id', showUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/review', showQAs);
router.post('/review/:id', createQA);
// router.post('/review/:id', createQALog);

export default router;