/** Middleware for handling req authorization for routes. */

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { user } = require('../db');


function authUser(req, res, next) {
  try {

    const tokenFromBody = req.body._token

    const payload = jwt.verify(tokenFromBody, SECRET_KEY)

    req.user = payload;
    
    return next();

  } catch (err) {
    err.status = 401;
    return next(err);
  }
} 

/** Authorization Middleware: Requires user is logged in. */

function requireLogin(req, res, next) {
  try {
    
    if (req.user) {
      return next();
    } else {
      return next({ status: 401, message: 'Unauthorized' });
    }
  } catch (err) {
    return next(err);
  }
}


module.exports = {
  requireLogin,
  authUser
};
