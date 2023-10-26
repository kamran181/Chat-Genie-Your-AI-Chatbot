import express from 'express';

import { postLogin, postSignup } from '../controllers/userController.js';

const router = express.Router();


router.post('/signup', postSignup);

router.post('/login' , postLogin);

export default router