var express = require("express");
var router = express.Router();

import db from "../middleware/data";

router.get("/", async function(req, res) {
  const logs = await db.getLogs();
  return res.json(
    logs.map(log => Object.assign(log, { message: JSON.parse(log.message) }))
  );
});

export default router;
