const { Transform } = require("stream");

class Caesar extends Transform {
  constructor(symbol, shift, action) {
    super();
    this.symbol = symbol;
    this.shift = shift;
    this.action = action;
  }
  _transform(chunk, encoding, callback) {
    try {
      const result = this._encode(
        chunk.toString("utf8"),
        this.shift,
        this.action
      );

      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }
  _isUpperCase(symbol) {
    if (symbol === symbol.toUpperCase()) {
      return true;
    } else {
      return false;
    }
  }
  _isLetter(symbol) {
    return /[a-z]/i.test(symbol);
  }
  _encode(text, shift, action) {
    let result = [];
    let codeA = "A".charCodeAt(0);
    let abcCount = 26;

    if (shift < 0) {
      shift = Math.abs(abcCount + shift);
    }

    for (let i = 0; i < text.length; i++) {
      if (!this._isLetter(text[i])) {
        result.push(text[i]);
      } else {
        let letterIdx = text.toUpperCase().charCodeAt(i) - codeA;
        let temp;
        if (action === "encode") {
          temp = String.fromCharCode(
            codeA + ((letterIdx + this.shift) % abcCount)
          );
        } else if (action === "decode") {
          temp = String.fromCharCode(
            codeA + ((letterIdx - this.shift + abcCount) % abcCount)
          );
        } else {
          console.error("Invailid action option");
          process.exit();
        }
        if (!this._isUpperCase(text[i])) {
          temp = temp.toLowerCase();
        }
        result.push(temp);
      }
    }
    return result.join("");
  }
}

module.exports = Caesar;
