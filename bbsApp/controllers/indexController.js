const { validationResult } = require('express-validator');

module.exports = {
  goIndex(req, res) {
    res.render('index', {title: 'Index'});
  }
}
