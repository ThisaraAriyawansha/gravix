import pool from '../config/database.js';

export const requireAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkAdminOrOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (req.user.role === 'admin' || req.user.id.toString() === id) {
      return next();
    }
    
    res.status(403).json({ error: 'Access denied.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};