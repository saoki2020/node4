const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const authRoute = require('../routes/authRoute');
const postRoute = require('../routes/postRoute');
const likeRoute = require('../routes/likeRoute');

router.get('/', authController.goLogin);

module.exports = [router, authRoute, postRoute, likeRoute]
