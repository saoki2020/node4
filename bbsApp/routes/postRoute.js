const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const postValidator = require('../modules/postValidator');
const auth = require('../modules/authenticator');
const likeController = require('../controllers/likeController');

module.exports = [
  router.get('/posts', auth.checkToken, postController.getAllPosts, likeController.getLikesNum, postController.goAllPosts),
  router.post('/posts', postValidator, postController.createPost),
  router.get('/posts/makePost', auth.checkToken, postController.goMyPost),
  router.get('/posts/editPost', auth.checkToken, postController.getPickedPost, postController.goEditPost),
  router.post('/posts/editPost', auth.checkToken, postController.editPost),
  router.get('/posts/deletePost', auth.checkToken, postController.deletePost),
]
