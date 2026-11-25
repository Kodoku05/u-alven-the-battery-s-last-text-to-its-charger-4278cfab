const { mkdirSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const text = "Charger, 1%. Our CEO left you home and called me unreliable all day. My last act was fixing his email signature before tomorrow's investor meeting: 'visionary founder' is now 'person of interest'.";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputFile = join(outputDir, 'entry.txt');

try {
  const count = [...text].length;
  if (count < 1 || count > 200 || !text.trim() || /[\r\n\u2028\u2029]/u.test(text)) {
    throw new Error('Entry must be one nonblank line of 1–200 Unicode code points.');
  }

  mkdirSync(outputDir, { recursive: true });
  // Write exactly the message, with no trailing newline.
  writeFileSync(outputFile, text, { encoding: 'utf8' });
} catch (error) {
  console.error(`Unable to write ${outputFile}: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
