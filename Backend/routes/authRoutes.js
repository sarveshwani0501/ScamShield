const express = require("express");

const router = express.Router();

router.post("/signup");

router.post("/login");

router.get("/logout");

router.post("/:id/change-password");

router.post("/:id/reset-password");


module.exports = router;