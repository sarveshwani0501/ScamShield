const express = require("express");

const router = express.Router();

const { getTokenDetails } = require("../controllers/tokenHandler.js");
router.get("/gettokendetails", getTokenDetails);

module.exports = router;
