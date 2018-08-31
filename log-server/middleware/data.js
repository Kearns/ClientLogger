const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE logging (type TEXT, message TEXT, date DATETIME)");

const pushLog = function({ type, message, date }) {
  db.serialize(() => {
    const stmt = db.prepare("INSERT INTO logging VALUES (?, ?, ?)");
    stmt.run(type, message, date);
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
