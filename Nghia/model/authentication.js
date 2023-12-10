var connect_DB = require('./connect_db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

function checkNoEmpty(obj) {
  if (obj == null || typeof obj !== 'object' || JSON.stringify(obj) === '{}') return false;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
        return false;
      }
    }
  }
  return true;
}

function signin(res, obj) {
  connect_DB.query("CALL SignInForLeTan(?, ?)", [obj.account, obj.password], function (err, result, field) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (result[0].length == 0) {
      return res.status(400).json({ message: "Người dùng không tồn tại hoặc sai thông tin đăng nhập. Vui lòng thử lại" });
    }

    const employee = {
      employeeID: result[0][0].employeeID,
      account: result[0][0].account
    };
    console.log(employee);

    const token = jwt.sign(employee, "RANDOM-TOKEN", { expiresIn: "15m" });
    res.json({ employee: employee, token: token });

  })
}

module.exports = { checkNoEmpty, signin }