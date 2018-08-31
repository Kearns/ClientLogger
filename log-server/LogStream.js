const { Transform } = require("stream");

class LogStream extends Transform {
  constructor({ socket, callback }) {
    super({ objectMode: true });
    this.socket = socket;
    this.callback = callback;
  }

  _transform(chunk, encoding, done) {
    this.callback(chunk);
    done();
  }
}

module.exports = LogStream;
