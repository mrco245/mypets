import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

// Middleware for JWT validation
export const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (token && token.startsWith('Bearer ')) {
        // Remove "Bearer " from the authHeader
        token = token.slice(7, token.length);
     }
  
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
  };