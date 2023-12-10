const express = require('express');
const authorization_router = express.Router();
const authorization_controller = require('../controllers/authorization');
const path = require("path");

authorization_router.post("/employee", authorization_controller.employee);

module.exports = authorization_router;

