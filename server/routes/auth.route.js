const express = require('express');
const { authController } = require('../controller');
const router = express.Router();

router
    .get("/login", authController.login)
    .post("/login", authController.getTokens)
    .post("/refresh", authController.refreshToken)

module.exports = router