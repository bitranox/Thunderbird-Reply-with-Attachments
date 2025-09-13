#!/usr/bin/env node
// Collapse Docusaurus locales list into a single comma-separated line.
// Detects the block that starts with:
//   [INFO] Website will be built for all these locales:
// followed by lines like: "- en" "- de" ...
// Outputs a single line with all locales: "[INFO] Website will be built for all these locales: en, de, ..."

import readline from 'node:readline';

const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
let collecting = false;
/** @type {string[]} */
let bucket = [];

function flushBucket(prefix) {
  if (!bucket.length) return;
  const line = `${prefix} ${bucket.join(', ')}`;
  process.stdout.write(line + '\n');
  bucket = [];
}

rl.on('line', (line) => {
  // Start of locales block
  if (!collecting && /^\s*\[INFO\]\s+Website will be built for all these locales:\s*$/.test(line)) {
    collecting = true;
    // Keep the exact prefix for re-use; we will print after collecting
    // Store the prefix to re-use during flush
    process.stdout._prefix = line.replace(/\s*$/, '');
    return; // don't print the header now
  }

  if (collecting) {
    const m = line.match(/^\s*-\s*(\S+)\s*$/);
    if (m) {
      bucket.push(m[1]);
      return; // suppress the original bullet line
    }
    // End of block: flush and fall through to print the current non-bullet line
    flushBucket(process.stdout._prefix || '[INFO] Website will be built for all these locales:');
    collecting = false;
  }

  process.stdout.write(line + '\n');
});

rl.on('close', () => {
  if (collecting) {
    flushBucket(process.stdout._prefix || '[INFO] Website will be built for all these locales:');
  }
});
