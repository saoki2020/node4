const express = require('express');
const router = express.Router();
const pageTransitionController = require('../controllers/pageTransitionController');
const formValidator = require('../modules/formValidator');
const usersModel = require('../models/usersModel');
const auth = require('../modules/authenticator');

/* GET home page. */
router.get('/', pageTransitionController.goIndex);
router.get('/login', pageTransitionController.goLogin);
router.get('/register', pageTransitionController.goRegister);
router.post('/allPosts', formValidator, usersModel.insertOrSelect, auth.getToken, auth.verifyToken, pageTransitionController.doLogin);
router.get('/allPosts', auth.checkToken, pageTransitionController.goAllPosts);
router.get('/myPost', auth.checkToken, pageTransitionController.goMyPost);
router.get('/signOut', pageTransitionController.doSignOut);

module.exports = router;
