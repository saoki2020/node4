const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const postValidator = require('../modules/postValidator');
const auth = require('../modules/authenticator');

module.exports = [
  router.get('/posts/allPosts', auth.checkToken, postController.getAllPosts, postController.goAllPosts),
  router.get('/posts/makePost', auth.checkToken, postController.goMyPost),
  router.post('/posts/createPost', postValidator, postController.createPost),
  router.get('/posts/editPost', auth.checkToken, postController.getPickedPost, postController.goEditPost),
  router.post('/posts/editPost', auth.checkToken, postController.editPost),
  router.get('/posts/deletePost', auth.checkToken, postController.deletePost),
]
