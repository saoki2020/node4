const userModel = require('../models/usersModel');

module.exports = {
  goAllPosts(req, res) {
    res.render('users/allPosts', { title: `Everyone's Posts`, data: res.user, posts: res.posts} );
  },
  goMyPost(req, res) {
    res.render('users/myPost', { title: 'Post new post', data: res.user} );
  },
  async getUserName(req, res, next) {
    await userModel.compareEmail(req, res);
    next();
  },
  async createUser(req, res, next) {
    await userModel.insertUserData(req, res);
    next();
  },
  goEditPost(req, res) {
    res.render('users/editPost', { title: 'Edit Post', data: res.user, post: res.post} );
  }

}
