var DataTypes = require("sequelize").DataTypes;

var _quantrivien = require("./quantrivien");
var _khuvuc = require("./khuvuc");
var _maytinh = require("./maytinh");
var _cauhinh = require("./cauhinh");
var _khuyenmai = require("./khuyenmai");

function initModels(sequelize) {
  var quantrivien = _quantrivien(sequelize, DataTypes);
  var maytinh = _maytinh(sequelize, DataTypes);
  var khuvuc = _khuvuc(sequelize, DataTypes);
  var cauhinh = _cauhinh(sequelize, DataTypes);
  var khuyenmai = _khuyenmai(sequelize, DataTypes);

  maytinh.belongsTo(cauhinh, {
    foreignKey: "id cau hinh",
  });

  maytinh.belongsTo(khuvuc, {
    through: khuvuc,
    foreignKey: "phan loai khu vuc",
  });
  khuvuc.hasMany(maytinh, {
    foreignKey: "loai khu vuc",
  });

  return {
    maytinh,
    khuvuc,
    cauhinh,
    quantrivien,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
