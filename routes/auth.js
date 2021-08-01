/** Auth-related routes. */

const User = require('../models/user');
const express = require('express');
const router = express.Router();
const createTokenForUser = require('../helpers/createToken');



router.post('/signup', async function(req, res, next) {
  try {
    const { username, password, email, hours } = req.body;
    let user = await User.register({username, password, email, hours});
    const token = createTokenForUser(username);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}); 


router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;
    
    let user = User.authenticate(username, password);

    const token = createTokenForUser(user);

    return res.json({ token });

  } catch (err) {
    return next(err);
  }
}); 

module.exports = router;
