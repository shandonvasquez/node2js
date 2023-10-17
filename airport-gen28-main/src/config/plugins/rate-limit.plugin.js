import rateLimit from 'express-rate-limit';

export const limitRequest = (maxRequests, windowMinutes, message) => {
  return rateLimit({
    max: maxRequests,
    windowMs: windowMinutes * 60 * 1000,
    message: message
  })
}