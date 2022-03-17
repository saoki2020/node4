const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const authRoute = require('../routes/authRoute');
const userRoute = require('../routes/userRoute');

router.get('/', authController.goLogin);

module.exports = [router, authRoute, userRoute]
