const { check } = require('express-validator');

module.exports = [
  check('email').not().isEmpty().withMessage('必須項目です')
  .isEmail().withMessage('有効なemailを入力してください'),
  check('password').not().isEmpty().withMessage('必須項目です')
  .isLength({min:7}).withMessage('パスワードは7文字以上必要です')
]
