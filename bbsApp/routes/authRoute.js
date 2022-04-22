const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const loginValidator = require('../modules/loginValidator');
const registerValidator = require('../modules/registerValidator');
const auth = require('../modules/authenticator');

module.exports = [
  router.post('/auth/login', loginValidator, userController.getUserName, auth.getToken, auth.verifyToken, authController.doLogin),
  router.post('/auth/register', registerValidator, userController.createUser, userController.getUserName, auth.getToken, auth.verifyToken, authController.doLogin),
  router.get('/auth/login', authController.goLogin),
  router.get('/auth/register', authController.goRegister),
  router.get('/auth/signOut', authController.doSignOut)
]
