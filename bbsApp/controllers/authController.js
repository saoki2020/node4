const { validationResult } = require('express-validator');

module.exports = {
  goLogin(req, res) {
    res.render('auth/login', {title: 'Login'});
  },
  goRegister(req, res) {
    res.render('auth/register', {title: 'Register'});
  },
  doLogin(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    };
    req.session.userId = res.user.userId;
    req.session.username = res.user.name;
    req.session.token = res.user.token;
    res.redirect('/posts');
  },
  doSignOut(req, res) {
    req.session.userId = null;
    req.session.token = null;
    req.session.username = null;
    req.session.myLikes = null;
    res.redirect('/auth/login');
  }
}
