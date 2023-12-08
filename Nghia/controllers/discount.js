const discount_model = require('../model/discount');

module.exports = {
    discountList: function (req, res) {
        discount_model.discountList(function (err, result) {
            if (err) {
                res.status(500).json({ message: err.message });
            }
            else {
                res.json({ discountList: result });
            }
        })
    },
    discountAdd: function (req, res) {
        let discount = {
            discountName: req.body.discountName,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            condition: req.body.condition,
            category: req.body.category,
            discountValue: req.body.discountValue,
        }
        discount_model.discountAdd(discount, function (err, result) {
            if (err) {
                res.status(500).json({ message: err.message });
            }
            else {
                res.json({ message: "Thêm khuyến mãi mới thành công!" })
            }
        })
    },
    discountForProduct: function(req, res) {
        discount_model.discountForProduct(req.body.productId, function(err, result) {
            if (err) {
                res.status(500).json({ message: err.message });
            }
            else {
                res.json({ discountForProduct: result });
            }
        })
    }
}