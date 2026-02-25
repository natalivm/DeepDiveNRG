#!/usr/bin/env node
'use strict';

const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, '_site');

// ─── Minifiers ────────────────────────────────────────────────────────────────

/**
 * Minify CSS by stripping comments and collapsing blank lines / indentation.
 * Uses a line-based approach so CSS values (e.g. rgba(0,0,0,0.5)) stay intact.
 */
function minifyCSS(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')  // strip /* block comments */
    .replace(/^\s+/gm, '')             // strip leading whitespace on each line
    .replace(/\s+$/gm, '')             // strip trailing whitespace on each line
    .replace(/\n+/g, '\n')             // collapse consecutive blank lines
    .trim();
}

/**
 * Minify JS by stripping JSDoc + block comments and single-line comments,
 * then collapsing blank lines.  Leaves actual code untouched.
 */
function minifyJS(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')  // strip /* … */ (includes /** JSDoc */)
    .replace(/^\s*\/\/.*$/gm, '')      // strip // line comments
    .replace(/^\s+/gm, '')             // strip leading whitespace on each line
    .replace(/\s+$/gm, '')             // strip trailing whitespace on each line
    .replace(/\n+/g, '\n')             // collapse blank lines
    .trim();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function kb(str) {
  return (Buffer.byteLength(str, 'utf8') / 1024).toFixed(1) + ' KB';
}

/**
 * Generate an 8-char hex fingerprint from a set of content strings.
 * Used to auto-version the SW cache key on every build.
 */
function contentHash(...strings) {
  return crypto
    .createHash('sha256')
    .update(strings.join(''))
    .digest('hex')
    .slice(0, 8);
}

function processFile(srcPath, destPath, transform) {
  const raw = fs.readFileSync(srcPath, 'utf8');
  const out = transform(raw);
  fs.writeFileSync(destPath, out);
  return { raw, out };
}

function copyFile(srcPath, destPath) {
  fs.copyFileSync(srcPath, destPath);
}

// ─── Build ────────────────────────────────────────────────────────────────────

console.log('Building DeepDiveNRG…\n');

fs.mkdirSync(SITE, { recursive: true });

// 1. Minify CSS & JS ──────────────────────────────────────────────────────────

const transformed = [
  { src: 'styles.css', transform: minifyCSS },
  { src: 'app.js',     transform: minifyJS  },
  { src: 'config.js',  transform: minifyJS  },
];

const fingerprint = {};  // store minified content for hashing

for (const { src, transform } of transformed) {
  const { raw, out } = processFile(
    path.join(ROOT, src),
    path.join(SITE, src),
    transform
  );
  fingerprint[src] = out;
  console.log(`  minified   ${src.padEnd(14)} ${kb(raw).padStart(8)} → ${kb(out).padStart(8)}`);
}

// 2. Service Worker — auto-version cache key ──────────────────────────────────

const version  = contentHash(...Object.values(fingerprint));
const cacheKey = `deepdivenrg-${version}`;

const swSrc = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const swOut = minifyJS(
  swSrc.replace(/const CACHE_NAME\s*=\s*'[^']+'/, `const CACHE_NAME='${cacheKey}'`)
);
fs.writeFileSync(path.join(SITE, 'sw.js'), swOut);
console.log(`  versioned  sw.js          cache key: ${cacheKey}`);

// 3. HTML files — copy as-is ──────────────────────────────────────────────────

for (const file of ['index.html', 'page1.html', 'page2.html', 'page3.html']) {
  copyFile(path.join(ROOT, file), path.join(SITE, file));
  console.log(`  copied     ${file}`);
}

// 4. Static files ─────────────────────────────────────────────────────────────

for (const file of ['manifest.json', '_config.yml', '.nojekyll']) {
  copyFile(path.join(ROOT, file), path.join(SITE, file));
  console.log(`  copied     ${file}`);
}

// 5. Icons directory ──────────────────────────────────────────────────────────

const iconsDir  = path.join(ROOT, 'icons');
const iconsDest = path.join(SITE, 'icons');
fs.mkdirSync(iconsDest, { recursive: true });
for (const file of fs.readdirSync(iconsDir)) {
  copyFile(path.join(iconsDir, file), path.join(iconsDest, file));
}
console.log(`  copied     icons/ (${fs.readdirSync(iconsDir).length} files)`);

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log(`\nBuild complete → _site/  [${cacheKey}]`);
