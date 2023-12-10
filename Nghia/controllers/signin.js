var authentication_model = require("../model/authentication")

module.exports = {
  signin: function (req, res) {
    const isEmpty = (value) => value == null || value == undefined || value == '';
    if (isEmpty(req.body.account)) {
      res.status(400).json({ message: "Vui lòng không bỏ trống tài khoản đăng nhập" });
      return;
    }
    if (isEmpty(req.body.password)) {
      res.status(400).json({ message: "Vui lòng không bỏ trống mật khẩu đăng nhập" });
      return;
    }
    let obj = {
      account: req.body.account,
      password: req.body.password
    };
    authentication_model.signin(res, obj);

  }
}