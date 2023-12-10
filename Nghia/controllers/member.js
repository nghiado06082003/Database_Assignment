const member_model = require('../model/member');
var bcrypt = require("bcrypt");

module.exports = {
    memberList: function (req, res) {
        member_model.memberList(function (err, result) {
            if (err) {
                res.status(500).json({ message: err.message })
            }
            else {
                res.json({ memberList: result[0] });
            }
        })
    },
    memberAdd: function (req, res) {
        const containsOnlyNumbers = (value) => /^\d+$/.test(value);
        const isEmpty = (value) => value == null || value == undefined || value == '';
        if (isEmpty(req.body.account)) {
            res.status(400).json({ message: 'Không được để trống tài khoản hội viên' });
        } else if (isEmpty(req.body.password)) {
            res.status(400).json({ message: 'Không được để trống mật khẩu hội viên' });
        } else if (isEmpty(req.body.name)) {
            res.status(400).json({ message: 'Không được để trống tên hội viên' });
        } else if (isEmpty(req.body.email)) {
            res.status(400).json({ message: 'Không được để trống email' });
        } else if (isEmpty(req.body.phoneNumber)) {
            res.status(400).json({ message: 'Không được để trống số diện thoại hội viên' });
        } else if (!containsOnlyNumbers(req.body.phoneNumber)) {
            res.status(400).json({ message: 'Số điện thoại chỉ được chứa ký tự số' });
        } else {
            bcrypt.hash(req.body.password, 10)
                .then((hashedPassword) => {
                    let member = {
                        account: req.body.account,
                        password: hashedPassword,
                        name: req.body.name,
                        email: req.body.email,
                        phoneNumber: req.body.phoneNumber
                    }
                    member_model.memberAdd(member, function (err, result) {
                        if (err) {
                            res.status(500).json({ message: err.message })
                        }
                        else {
                            res.json({ message: "Thêm hội viên mới thành công!" })
                        }
                    })
                })
                .catch((error) => {
                    res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                })
        }

    }

}