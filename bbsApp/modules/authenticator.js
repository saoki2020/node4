const jwt = require('jsonwebtoken');

// jwtの設定
const jwtConfig = {
  secret: 'secret_key',
  options: {
    algorithm: 'HS256',
    expiresIn: '10s'
  }
}

module.exports = {
  // tokenを生成してリクエストヘッダーに追加
  getToken(req, res, next) {
    const payload = {
      name: req.body.name,
      email: req.body.email
    }
    const token = jwt.sign(payload, jwtConfig.secret, jwtConfig.options);
    req.headers.authorization = `Bearer ${token}`;
    next();
  },

  // リクエストヘッダーからtokenを取り出して比較
  verifyToken(req, res, next) {
    const bearToken = req.headers.authorization;
    const bearer = bearToken.split(' ');
    const token = bearer[1];
    jwt.verify(token, jwtConfig.secret, (error, user) => {
      if (error) throw new Error('invalid token');
      if (user.name === req.body.name) {
        res.user = {
          name: user.name,
          token: token
        };
        next();
      } else {
        throw new Error('username does not match');
      }
    });
  },

  // tokenが無ければログイン画面へ遷移、あったらverifyする
  checkToken(req, res, next) {
    if (!req.session.token) {
      res.redirect('/auth/login');
      return
    } else {
      jwt.verify(req.session.token, jwtConfig.secret, (error, user) => {
        if (error) {
          res.redirect('/auth/login');
          return
        }
        if (user.name === req.session.username) {
          res.user = {
            name: user.name,
            token: req.session.token
          };
          next();
        } else {
          throw new Error('username does not match');
        }
      })
    }
  }
}
