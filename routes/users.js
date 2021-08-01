const User = require('../models/user');
const Book = require('../models/book');
const Note = require('../models/note');
const express = require('express');
const { authUser, requireLogin } = require('../middleware/auth');
const router = express.Router();

router.get('/:username',authUser, requireLogin, async function(req, res, next) {
    try {
        let user = await User.get(req.params.username);
        let books = await Book.getAll(req.params.username);

            if(req.params.username!=req.user.username){
              throw new ExpressError("Token invalid", 401);
            }
            return res.json({ user, books });;
        
          } catch (err) {
            return next(err);
          }
  }); 
  

  router.get('/:username/:title',authUser, async function(req, res, next) {
    try {
        let user = await User.get(req.params.username);
        let book = await Book.get(req.params.title);

            if(req.params.username!=req.user.username){
              throw new ExpressError("Token invalid", 401);
            }
            return res.json({ user, book });;
        
          } catch (err) {
            return next(err);
          }
  }); 


router.patch('/:username', authUser, async function(
    req,
    res,
    next
  ) {
    try {
        
      let user = await User.get(req.params.username);
  
      if (req.params.username!=req.user.username) {
  
        throw new ExpressError('Only that user or admin can edit a user.', 401);
      }
  
      
      let fields = { ...req.body };
      delete fields.token;
  
      user = await User.update(req.params.username, fields);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  }); 
  
  
  router.delete('/:username', authUser, async function(
    req,
    res,
    next
  ) {
    try {
      User.delete(req.params.username);
      return res.json({ message: 'deleted' });
    } catch (err) {
      return next(err);
    }
  });
  
  module.exports = router;
  