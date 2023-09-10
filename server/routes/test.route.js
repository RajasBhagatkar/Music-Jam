const express = require('express');
const { testController } = require('../controller');
const router = express.Router();

router.get("/", testController.test)

module.exports = router