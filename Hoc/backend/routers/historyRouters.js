const express = require("express");
const routes = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

const {
  getPrintingHistory,
  getPersonalPrintingHistory,
  getPrinterPrintingHistory,
  getKhuyenMai,
  getProductBySaleID,
} = require("../controllers/historyController");

routes.get("/", authenticateToken, getPrintingHistory);

routes.get("/sales", authenticateToken, getKhuyenMai);
routes.get("/sales/:id_sale", authenticateToken, getProductBySaleID);

routes.get("/:id", authenticateToken, getPersonalPrintingHistory);

routes.get("/printer/:id", authenticateToken, getPrinterPrintingHistory);

module.exports = routes;
