// TODO: Allow configuration for different datasources. For now just forcing sqlite
const { getLogs, pushLog } = require("../extensions/destinations/sqlite");

module.exports = { getLogs, pushLog };
