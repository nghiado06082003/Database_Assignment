const otherServices_model = require('../model/otherServices');

module.exports = {
    getComputerPrice: function (req, res) {
        const isEmpty = (value) => value == null || value == undefined || value == '';
        if (isEmpty(req.body.computerId)) {
            res.status(400).json({ message: "Không được để trống mã máy tính cần tìm" });
            return;
        }
        otherServices_model.getComputerPrice(req.body.computerId, function (err, result) {
            if (err) {
                res.status(500).json({ message: err.message })
            }
            else {
                console.log(result);
                res.json({ priceList: result[0] });
            }
        })
    },
    sessionList: function (req, res) {
        otherServices_model.sessionList(function (err, result) {
            if (err) {
                res.status(500).json({ message: err.message })
            }
            else {
                console.log(result);
                res.json({ sessionList: result[0] });
            }
        })
    },
    sessionSearchByMember: function (req, res) {
        const isEmpty = (value) => value == null || value == undefined || value == '';
        if (isEmpty(req.body.memberId)) {
            res.status(400).json({ message: "Không được để trống tài khoản hội viên cần tìm" });
            return;
        }
        otherServices_model.sessionSearchByMember(req.body.memberId, function (err, result) {
            if (err) {
                res.status(500).json({ message: err.message })
            }
            else {
                res.json({ sessionList: result[0] });
            }
        })
    },
    sessionSearchByComputer: function (req, res) {
        const isEmpty = (value) => value == null || value == undefined || value == '';
        if (isEmpty(req.body.computerId)) {
            res.status(400).json({ message: "Không được để trống mã máy tính cần tìm" });
            return;
        }
        otherServices_model.sessionSearchByComputer(req.body.computerId, function (err, result) {
            if (err) {
                res.status(500).json({ message: err.message })
            }
            else {
                res.json({ sessionList: result[0] });
            }
        })
    }
}