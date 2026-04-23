import { asyncHandler } from '../utils/asynchandler.js';
import { verifyToken } from '../utils/jwt.utils.js';

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized - no token'
    });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  req.user = decoded;
  next();
});
