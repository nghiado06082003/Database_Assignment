const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "khuyenmai",
    {
      "ma khuyen mai": {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      "ten chuong trinh": {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Khuyen Mai",
      hasTrigger: true,
      timestamps: false,
    }
  );
};
