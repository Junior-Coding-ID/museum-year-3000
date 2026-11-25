// Museum of the Year 3000 — museum label for a parking meter.
// Node-only program (no Deno APIs): writes the final one-line label to
// entry.txt and verifies it byte-for-byte before exiting.
const fs = require('node:fs');
const path = require('node:path');

const ANSWER =
  'Parking meter, c. 2026. Humans fed it coins to prevent it from laying a $65 paper egg under their windshield wipers.';

const EXPECTED_CHARS = 116;

function main() {
  const targets = [
    path.join(__dirname, 'entry.txt'),
    path.join(__dirname, 'output', 'entry.txt'),
  ];

  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, ANSWER, 'utf8');
  }

  // Self-check: read every file back byte-for-byte and verify the gate.
  for (const target of targets) {
    const bytes = fs.readFileSync(target);
    const text = bytes.toString('utf8');
    if (text !== ANSWER) {
      throw new Error('self-check failed: content mismatch in ' + target);
    }
    if (text.length !== EXPECTED_CHARS) {
      throw new Error(
        'self-check failed: expected ' + EXPECTED_CHARS + ' chars, got ' + text.length
      );
    }
    if (text.length < 1 || text.length > 200) {
      throw new Error('self-check failed: length outside 1-200 gate');
    }
    if (text.split('\n').length !== 1) {
      throw new Error('self-check failed: entry must be exactly one line');
    }
    if (text.trim().length === 0) {
      throw new Error('self-check failed: entry is only whitespace');
    }
  }

  console.log('OK: entry.txt written and verified (' + EXPECTED_CHARS + ' chars, 1 line)');
}

main();
