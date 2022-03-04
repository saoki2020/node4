const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const formValidator = require('../modules/formValidator');
const usersModel = require('../models/usersModel');
const auth = require('../modules/authenticator');

module.exports = [
  router.post('/users/allPosts', formValidator, usersModel.insertOrSelect, auth.getToken, auth.verifyToken, userController.doLogin),
  router.get('/users/allPosts', auth.checkToken, userController.goAllPosts),
  router.get('/users/myPost', auth.checkToken, userController.goMyPost)
]
