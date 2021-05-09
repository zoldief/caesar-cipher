const { Readable } = require("stream");
const { Writable } = require("stream");
const fs = require("fs");

class ReadStream extends Readable {
  constructor(opt) {
    super(opt);

    this._max = 1000;
    this._index = 0;
  }

  _read() {
    this._index += 1;

    if (this._index > this._max) {
      this.push(null);
    } else {
      const buf = Buffer.from(`${this._index}`, "utf8");
    }
  }
}

class WriteStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
  }
  _construct(callback) {
    fs.open(this.filename, (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = ReadStream;
