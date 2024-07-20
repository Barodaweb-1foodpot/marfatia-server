const express = require("express");
const { createStopTrade } = require("../controllers/StopTrade");
const router = express.Router();

router.post("/stop-trade", createStopTrade);

module.exports = router;
