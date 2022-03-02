const { validationResult } = require('express-validator');

module.exports = {
  doLogin(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    };
    req.session.username = res.user.name;
    req.session.token = res.user.token;
    res.render('user/allPosts', { title: `Everyone's Posts`, data: res.user} );
  },
  goAllPosts(req, res) {
    res.render('user/allPosts', { title: `Everyone's Posts`, data: res.user} );
  },
  goMyPost(req, res) {
    res.render('user/myPost', { title: 'Post new post', data: res.user} );
  }
}
