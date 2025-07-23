const express = require("express");

const router = express.Router();

const { getTokenDetails } = require("./tokenHandler");
router.get("/gettokendetails", getTokenDetails);

module.exports = router;
