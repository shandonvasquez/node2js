import { envs } from "../config/enviroments/enviroments.js";
import { AppError, catchAsync } from "../errors/index.js";
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { AuthService } from "./auth.service.js";

const authService = new AuthService()

// Middleware para validar la existencia de un usuario por ID
export const validateUserExistence = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await authService.findOneUserById(id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  req.user = user;
  next();
});

// Middleware para validar la existencia de un servicio pendiente
export const validatePendingServiceExistence = catchAsync(async (req, res, next) => {
  // Puedes personalizar la lógica para obtener el servicio pendiente de la solicitud
  const { serviceId } = req.params;

  // Aquí, obtén el servicio pendiente según tu modelo de datos o lógica
  const pendingService = await getServiceById(serviceId);

  if (!pendingService || pendingService.status !== 'pending') {
    return next(new AppError('Pending service not found', 404));
  }

  req.pendingService = pendingService;
  next();
});

export const protect = catchAsync(async(req,res,next) => {
  // ... (código existente)

  //6. adjuntar el usuario en session, el usuario en session es el usuario dueño del token
  req.sessionUser = user;
  next();
})

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  }
}

export const protectAccountOwner = (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account', 401));
  }

  next();
}

export const validExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await authService.findOneUserById(id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  req.user = user;
  next();
});
