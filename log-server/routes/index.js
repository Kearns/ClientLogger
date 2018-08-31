var express = require("express");
var router = express.Router();

const db = require("../middleware/data.js");

router.get("/", async function(req, res, next) {
  const logs = await db.getLogs();
  return res.json(
    logs.map(log => Object.assign(log, { message: JSON.parse(log.message) }))
  );
});

module.exports = router;
