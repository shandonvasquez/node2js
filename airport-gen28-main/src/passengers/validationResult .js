import { body, validationResult } from 'express-validator';

// Función para validar un objeto de pasajero completo
export const validatePassenger = [
  body('name').notEmpty().withMessage('El campo "name" es obligatorio'),
  body('email').isEmail().withMessage('El campo "email" debe ser una dirección de correo válida'),
  body('password').isLength({ min: 6 }).withMessage('El campo "password" debe tener al menos 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        message: errors.array(),
      });
    }
    next();
  },
];

// Función para validar un objeto de pasajero parcial (por ejemplo, para actualizaciones)
export const validatePartialPassenger = [
  body('name').optional().notEmpty().withMessage('El campo "name" es obligatorio'),
  body('email').optional().isEmail().withMessage('El campo "email" debe ser una dirección de correo válida'),
  body('password').optional().isLength({ min: 6 }).withMessage('El campo "password" debe tener al menos 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: 'error',
        message: errors.array(),
      });
    }
    next();
  },
];
