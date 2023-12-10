const { khuyenmai, sequelize } = require("../models");

const getKhuyenMai = async (req, res) => {
  try {
    const sales = await khuyenmai.findAll({
      attributes: ["ma khuyen mai", "ten chuong trinh"],
    });
    res.json(sales);
    console.log(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductBySaleID = async (req, res) => {
  try {
    const { id_sale } = req.params;
    const results = await sequelize.query(
      `CALL thongKeSPKhuyenMai('${id_sale}')`
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrintingHistory = async (req, res) => {
  //   try {
  //     const results = await sequelize.query("CALL UserPrintingHistory()");
  //     res.json(results);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
};
const getPersonalPrintingHistory = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const results = await sequelize.query(
  //       `CALL PersonalPrintingHistory('${id}')`
  //     );
  //     res.json(results);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
};

const getPrinterPrintingHistory = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const results = await sequelize.query(`CALL GetPrintingHistory('${id}')`);
  //     res.json(results);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
};
module.exports = {
  getKhuyenMai,
  getProductBySaleID,
  getPrintingHistory,
  getPersonalPrintingHistory,
  getPrinterPrintingHistory,
};
