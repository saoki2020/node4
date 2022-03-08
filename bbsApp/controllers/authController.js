const { validationResult } = require('express-validator');

module.exports = {
  goLogin(req, res) {
    res.render('auth/login', {title: 'Login'});
  },
  goRegister(req, res) {
    res.render('auth/register', {title: 'Register'});
  },
  doSignOut(req, res) {
    req.session.token = null;
    req.session.username = null;
    res.redirect('/auth/login');
  }
}
