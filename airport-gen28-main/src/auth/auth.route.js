import express from 'express';
import { login, register, changePassword, deleteAccount } from './auth.controller.js';
import { protect, protectAccountOwner, restrictTo, validExistUser } from './auth.middleware.js';

export const router = express.Router();

router.post('/login', login)

router.post('/register', protect, restrictTo('developer'), register)

router.patch('/change-password', protect, changePassword)

router.delete('/:id', protect, validExistUser, protectAccountOwner ,deleteAccount)

//1. SIEMPRE QUE VOY A USAR EL restrictTo() antes debo usar el protect

//2. siempre que vaya a usar el protectAccountOnwer debo ejecutar el protect, y le debo adjuntar la informacion del usuario que le corresponde esa accion