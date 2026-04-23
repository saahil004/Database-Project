import { asyncHandler } from '../utils/asynchandler.js';
import { authMiddleware } from './auth.middleware.js';

export const adminAuth = asyncHandler(async (req, res, next) => {
  await authMiddleware(req, res, async () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    next();
  });
});
