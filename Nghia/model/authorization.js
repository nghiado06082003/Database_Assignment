var connect_DB = require('./connect_db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

async function loadCurMember(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Người dùng chưa đăng nhập." });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, "RANDOM-TOKEN");
    const cur_employee = decodeToken;
    req.cur_employee = cur_employee;
    next();
  }
  catch (error) {
    res.status(401).json({ message: "Phiên đăng nhập đã hết hạn" });
  }
}

async function authorizeEmployee(req, res, next) {
  if (!req.cur_employee) {
    return res.status(401).json({ message: "Người dùng không xác định. Vui lòng kiểm tra" });
  }

  connect_DB.query("CALL AuthorizeLeTan(?, ?)", [req.cur_employee.employeeID, req.cur_employee.account], function (err, result) {
    if (err) {
      res.status(500).json({ message: err.message });
    }
    else if (result[0].length == 0) {
      res.status(401).json({ message: "Người dùng không tồn tại hoặc sai thông tin đăng nhập. Vui lòng thử lại" });
    }
    else {
      next();
    }
  })
}

module.exports = {
  loadCurMember,
  authorizeEmployee
}