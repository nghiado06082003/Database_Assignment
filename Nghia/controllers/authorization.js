const path = require("path");
const authorization_model = require('../model/authorization');

module.exports = {
  employee: [authorization_model.loadCurMember, authorization_model.authorizeEmployee, function (req, res) {
    res.status(200).json({});
  }]
}