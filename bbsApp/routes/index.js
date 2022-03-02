const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const formValidator = require('../modules/formValidator');
const usersModel = require('../models/usersModel');
const auth = require('../modules/authenticator');

/* GET home page. */
router.get('/', indexController.goIndex);
router.get('/auth/login', authController.goLogin);
router.get('/auth/register', authController.goRegister);
router.get('/auth/signOut', authController.doSignOut);
router.post('/user/allPosts', formValidator, usersModel.insertOrSelect, auth.getToken, auth.verifyToken, userController.doLogin);
router.get('/user/allPosts', auth.checkToken, userController.goAllPosts);
router.get('/user/myPost', auth.checkToken, userController.goMyPost);

module.exports = router;
