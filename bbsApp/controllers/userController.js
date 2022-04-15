const usersModel = require('../models/usersModel');

module.exports = {
  async getUserName(req, res, next) {
    await usersModel.compareEmail(req, res);
    next();
  },
  async createUser(req, res, next) {
    await usersModel.insertUserData(req, res);
    next();
  },

}
