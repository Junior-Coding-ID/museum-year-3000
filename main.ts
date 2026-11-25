const fs = require("fs");
const path = require("path");

const answer = "Parking meter, c. 2026. Humans fed it coins to prevent it from laying a $65 paper egg under their windshield wipers.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_OUTPUT || "/output";
const outPath = path.join(outDir, "entry.txt");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, answer, "utf8");

// Self-check: read back byte-for-byte and verify against the answer.
const back = fs.readFileSync(outPath, "utf8");
if (back !== answer) {
  throw new Error("entry.txt mismatch: written bytes differ from answer");
}
if (answer.length !== 116) {
  throw new Error("answer length is " + answer.length + ", expected 116");
}
if (answer.length < 1 || answer.length > 200) {
  throw new Error("answer outside 1-200 character gate");
}
if (answer.indexOf("\n") !== -1 || answer.indexOf("\r") !== -1) {
  throw new Error("answer must be a single line");
}
console.log("OK: entry.txt written to " + outPath + " (" + answer.length + " chars)");
