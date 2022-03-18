const { validationResult } = require('express-validator');
const postsModel = require('../models/postsModel');

module.exports = {
  goAllPosts(req, res) {
    res.render('posts/allPosts', { title: `Everyone's Posts`, data: res.user, posts: res.posts} );
  },
  goMyPost(req, res) {
    res.render('posts/makePost', { title: 'Make new post', data: res.user} );
  },
  goEditPost(req, res) {
    res.render('posts/editPost', { title: 'Edit Post', data: res.user, post: res.post} );
  },
  async createPost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      await postsModel.insertPost(req, res);
      res.user = {
        name: req.session.username
      }
    }
    res.redirect('/posts/allPosts');
  },
  async getAllPosts(req, res, next) {
    await postsModel.selectPosts(req, res);
    next();
  },
  async getPickedPost(req, res, next) {
    await postsModel.selectPickedPost(req, res);
    next();
  },
  async editPost(req, res) {
    await postsModel.updatePost(req, res);
    res.redirect('/posts/allPosts');
  },
  async deletePost(req, res) {
    await postsModel.deletePickedPost(req, res);
    res.redirect('/posts/allPosts');
  }

}