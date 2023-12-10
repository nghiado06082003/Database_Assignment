const discount_model = require('../model/discount');

module.exports = {
    discountList: function (req, res) {
        discount_model.discountList(function (err, result) {
            if (err) {
                res.status(500).json({ message: err.message });
            }
            else {
                res.json({ discountList: result[0] });
            }
        })
    },
    discountAdd: function (req, res) {
        const isEmpty = (value) => value == null || value == undefined || value == '';
        const containsOnlyNumbers = (value) => /^\d+$/.test(value);
        if (isEmpty(req.body.discountID)) {
            res.status(400).json({ message: 'Không được bỏ trống mã khuyến mãi' });
        } else if (isEmpty(req.body.discountName)) {
            res.status(400).json({ message: 'Không được bỏ trống tên chương trình khuyến mãi' });
        } else if (isEmpty(req.body.description)) {
            res.status(400).json({ message: 'Không được bỏ trống mô tả khuyến mãi' });
        } else if (isEmpty(req.body.startDate)) {
            res.status(400).json({ message: 'Không được bỏ trống ngày bắt đầu khuyến mãi' });
        } else if (isEmpty(req.body.endDate)) {
            res.status(400).json({ message: 'Không được bỏ trống ngày kết thúc khuyến mãi' });
        } else if (isEmpty(req.body.condition)) {
            res.status(400).json({ message: 'Không được bỏ trống điều kiện khuyến mãi' });
        } else if (isEmpty(req.body.category)) {
            res.status(400).json({ message: 'Không được bỏ trống loại khuyến mãi' });
        } else if (isEmpty(req.body.discountValue)) {
            res.status(400).json({ message: 'Không được bỏ trống mức giảm của khuyến mãi' });
        } else if (!containsOnlyNumbers(req.body.discountID)) {
            res.status(400).json({ message: 'Mã khuyến mãi phải là số nguyên dương' });
        } else if (!containsOnlyNumbers(req.body.condition)) {
            res.status(400).json({ message: 'Điều kiện khuyến mãi phải là số nguyên dương' });
        } else if (!/^\d+(\.\d+)?$/.test(req.body.discountValue) || !(req.body.discountValue > 0 && req.body.discountValue < 1)) {
            res.status(400).json({ message: 'Mức giảm của khuyến mãi phải là số thực lớn hơn 0 nhỏ hơn 1' });
        } else {
            let start_date = new Date(req.body.startDate);
            let end_date = new Date(req.body.endDate);
            let discount = {
                discountID: req.body.discountID,
                discountName: req.body.discountName,
                description: req.body.description,
                startDate: start_date.toISOString().split('T')[0] + ' ' + start_date.toTimeString().split(' ')[0],
                endDate: end_date.toISOString().split('T')[0] + ' ' + end_date.toTimeString().split(' ')[0],
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
        }
    },
    discountForProduct: function (req, res) {
        const isEmpty = (value) => value == null || value == undefined || value == '';
        if (isEmpty(req.body.productId)) {
            res.status(400).json({ message: 'Không được bỏ trống mã sản phẩm cần tìm' });
            return;
        }
        discount_model.discountForProduct(req.body.productId, function (err, result) {
            if (err) {
                res.status(500).json({ message: err.message });
            }
            else {
                res.json({ discountForProduct: result[0] });
            }
        })
    }
}