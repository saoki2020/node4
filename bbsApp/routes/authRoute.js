const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


module.exports = [
  router.get('/auth/login', authController.goLogin),
  router.get('/auth/register', authController.goRegister),
  router.get('/auth/signOut', authController.doSignOut)
]
