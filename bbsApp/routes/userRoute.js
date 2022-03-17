const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const postValidator = require('../modules/postValidator');
const auth = require('../modules/authenticator');

module.exports = [
  router.get('/users/allPosts', auth.checkToken, postController.getAllPosts, userController.goAllPosts),
  router.get('/users/myPost', auth.checkToken, userController.goMyPost),
  router.post('/users/createPost', postValidator, postController.createPost),
  router.get('/users/editPost', auth.checkToken, postController.getPickedPost, userController.goEditPost),
  router.post('/users/editPost', auth.checkToken, postController.editPost),
  router.get('/users/deletePost', auth.checkToken, postController.deletePost),
]
