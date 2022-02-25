const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const formValidator = require('../modules/formValidator');
const model = require('../models/model');
const auth = require('../modules/authenticator');

/* GET home page. */
router.get('/', controller.goIndex);
router.get('/login', controller.goLogin);
router.get('/register', controller.goRegister);
router.post('/allPosts', formValidator, model.insertOrSelect, auth.getToken, auth.verifyToken, controller.doLogin);
router.get('/allPosts', auth.checkToken, controller.goAllPosts);
router.get('/myPost', auth.checkToken, controller.goMyPost);
router.get('/signOut', controller.doSignOut);

module.exports = router;
