const userModel = require('../models/usersModel');

module.exports = {
  async getUserName(req, res, next) {
    await userModel.compareEmail(req, res);
    next();
  },
  async createUser(req, res, next) {
    await userModel.insertUserData(req, res);
    next();
  },

}
