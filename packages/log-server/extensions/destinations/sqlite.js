const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../DB.db");
const uuidv4 = require('uuid/v4');

db.run("CREATE TABLE IF NOT EXISTS logging (type TEXT, message TEXT, date DATETIME, id STRING PRIMARY_KEY)");

const pushLog = function({ type, message, date, }) {
  db.serialize(() => {
    const stmt = db.prepare("INSERT INTO logging VALUES (?, ?, ?, ?)");
    stmt.run(type, message, date, uuidv4());
    stmt.finalize();
  });
};

const getLogs = () =>
  new Promise((resolve, reject) => {
    db.all("SELECT * FROM logging", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });

module.exports = { getLogs, pushLog };
