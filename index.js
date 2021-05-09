const path = require("path");
const fs = require("fs");
const readline = require("readline");
const { pipeline, Transform } = require("stream");
const { promisify } = require("util");
const Caesar = require("./caesar");
const options = require("./options");
const { resolve } = require("path");

const pipelineAsync = promisify(pipeline);
const action = options.action;
const shift = options.shift;
const input = options.input ? path.resolve(options.input) : process.stdin;
const output = options.output ? path.resolve(options.output) : process.stdout;

if (!fs.existsSync(input) && input !== process.stdin) {
  console.error("Input not found");
  process.exit();
}

if (!fs.existsSync(output) && output !== process.stdout) {
  console.error("Output not found");
  process.exit();
}

if (input === process.stdin && output === process.stdout) {
  console.log("Enter message:");
  process.stdin.on("readable", function () {
    let message = String(process.stdin.read());
    process.stdout.write(
      `Result:\n${new Caesar(message, +shift, action)._encode(
        message,
        +shift,
        action
      )}`
    );
    process.stdin.resume();
  });
} else if (input === process.stdin) {
  console.log("Enter message:");
  process.stdin.on("readable", function () {
    let message = String(process.stdin.read());
    const writeStream = fs.createWriteStream(output, { flags: "a" });
    writeStream.write(
      new Caesar(message, +shift, action)._encode(message, +shift, action)
    );
    process.stdin.resume();
  });
} else if (output === process.stdout) {
  (async function run() {
    let result = [];
    await result.push(fs.readFileSync(input, { encoding: "utf-8" }));
    process.stdout.write(
      `Result:\n${new Caesar(result[0], +shift, action)._encode(
        result[0],
        +shift,
        action
      )}`
    );
  })();
} else {
  const readStream = fs.createReadStream(input);
  const writeStream = fs.createWriteStream(output, { flags: "a" });
  const transform = new Caesar(null, +shift, action);

  (async function run() {
    try {
      await pipelineAsync(readStream, transform, writeStream);
      console.log("Success.");
    } catch (err) {
      console.error("pipeline failed with error:", err);
    }
  })();
}
