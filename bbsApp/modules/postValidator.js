const { check } = require('express-validator');

module.exports = [
  check('title').not().isEmpty().withMessage('タイトルを入力してください'),
  check('content').not().isEmpty().withMessage('何か入力してください')
  .isLength({max:140}).withMessage('140文字までしか入力できません')
]
