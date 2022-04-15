const { check } = require('express-validator');

module.exports = (req, res, next) => {
  // ログインの場合
  if (req.body.login === 'login') {
    check('email').not().isEmpty().withMessage('必須項目です')
    .isEmail().withMessage('有効なemailを入力してください'),
    check('password').not().isEmpty().withMessage('必須項目です')
    .isLength({min:7}).withMessage('パスワードは7文字以上必要です')
  }
  // 新規登録の場合
  if (req.body.register === 'register') {
    check('name').not().isEmpty().withMessage('必須項目です'),
    check('email').not().isEmpty().withMessage('必須項目です')
    .isEmail().withMessage('有効なemailを入力してください'),
    check('password').not().isEmpty().withMessage('必須項目です')
    .isLength({min:7}).withMessage('パスワードは7文字以上必要です'),
    check('confirm_password').not().isEmpty().withMessage('必須項目です')
    .isLength({min:7}).withMessage('パスワードは7文字以上必要です')
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error ('パスワードが一致しません');
      };
      return true;
    })
  }
  next();
}
