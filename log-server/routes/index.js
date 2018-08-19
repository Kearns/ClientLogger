var express = require("express");
var router = express.Router();

const db = require("../DataDriver.js");

/* GET home page. */
router.get("/", async function(req, res, next) {
  const logs = await db.getLogs();
  return res.json(logs);
});

module.exports = router;
