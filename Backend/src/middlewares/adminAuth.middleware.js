import { asyncHandler } from '../utils/asynchandler.js';
import { authMiddleware } from './auth.middleware.js';

export const adminAuth = (req, res, next) => {
  authMiddleware(req, res, (err) => {
    if (err) return next(err);
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    next();
  });
};
