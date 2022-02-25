const { validationResult } = require('express-validator');

module.exports = {
  goIndex(req, res) {
    res.render('index', {title: 'Index'});
  },
  goLogin(req, res) {
    res.render('login', {title: 'Login'});
  },
  goRegister(req, res) {
    res.render('register', {title: 'Register'});
  },
  doLogin(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    };
    req.session.username = res.user.name;
    req.session.token = res.user.token;
    res.render('allPosts', { title: `Everyone's Posts`, data: res.user} );
  },
  goAllPosts(req, res) {
    res.render('allPosts', { title: `Everyone's Posts`, data: res.user} );
  },
  goMyPost(req, res) {
    res.render('myPost', { title: 'Post new post', data: res.user} );
  },
  doSignOut(req, res) {
    req.session.token = null;
    req.session.username = null;
    res.redirect('login');
  }
}
