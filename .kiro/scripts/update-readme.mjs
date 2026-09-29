import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const signsPath = join(rootDir, 'src', 'signs.js');
const readmePath = join(rootDir, 'README.md');

const signsContent = readFileSync(signsPath, 'utf8');

const signsMatch = signsContent.match(/export const signs = (\{[\s\S]*?\});/);
if (!signsMatch) {
  console.error('Could not find signs data in src/signs.js');
  process.exit(1);
}

const signsObject = JSON.parse(signsMatch[1].replace(/'/g, '"').replace(/\b([a-z]+)\b:/g, '"$1":').replace(/:\s*'([^']*)'/g, ':"$1"'));

let readmeContent = '';
if (existsSync(readmePath)) {
  readmeContent = readFileSync(readmePath, 'utf8');
} else {
  readmeContent = `# horoscopo-cli

A CLI tool that provides daily horoscope readings for zodiac signs.

## Usage

\`\`\`bash
horoscopo <sign>
\`\`\`

## Supported Signs

`;
}

const signsList = Object.entries(signsObject)
  .map(([key, sign]) => `- ${sign.emoji} ${sign.name} (${key})`)
  .join('\n');

const updatedReadme = readmeContent.replace(
  /(## Supported Signs\n)[\s\S]*/i,
  `$1\n${signsList}\n`
);

writeFileSync(readmePath, updatedReadme, 'utf8');
console.log('README.md updated with available signs.');
