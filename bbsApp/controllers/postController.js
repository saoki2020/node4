const { validationResult } = require('express-validator');
const postsModel = require('../models/postsModel');

module.exports = {
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
    res.redirect('/users/allPosts');
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
    res.redirect('/users/allPosts');
  },
  async deletePost(req, res) {
    await postsModel.deletePickedPost(req, res);
    res.redirect('/users/allPosts');
  }


}
