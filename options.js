const { program } = require("commander");

program
  .description(
    "An application for encode and decode messages with caesar-cipher"
  )
  .requiredOption("-s, --shift <shift>", "a shift")
  .option("-i, --input <filename>", " an input file")
  .option("-o, --output <filename>", "an output file")
  .requiredOption("-a, --action <action>", "an action encode/decode");

program.parse();
const options = program.opts();

module.exports = options;
