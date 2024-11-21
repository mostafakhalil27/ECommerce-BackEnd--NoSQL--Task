import Router from 'express';
import {
  signUp,
  signIn,
  updateUser,
  deleteUser,
  searchUsers,
  searchWithAgeRange,
  getAllUsers, 
  getUserProducts
  } from './controller/user.controller.js';

const router = Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.patch('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/searchUsers', searchUsers);
router.get('/searchWithAgeRange', searchWithAgeRange);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserProducts/:id', getUserProducts);


export default router;