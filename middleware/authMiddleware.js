// middleware/authMiddleware.js

function requireRole(role) {
  return function (req, res, next) {
    if (!req.session || !req.session.user || req.session.user.role !== role) {
      return res.status(403).send('Access denied');
    }
    next();
  };
}

module.exports = requireRole;
