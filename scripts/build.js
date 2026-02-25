#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, '_site');

// Create output directory
fs.mkdirSync(SITE, { recursive: true });

// Files to copy from root
const files = [
  'index.html',
  'page1.html',
  'page2.html',
  'page3.html',
  'styles.css',
  'app.js',
  'config.js',
  'sw.js',
  'manifest.json',
  '_config.yml',
  '.nojekyll',
];

for (const file of files) {
  fs.copyFileSync(path.join(ROOT, file), path.join(SITE, file));
  console.log(`  copied ${file}`);
}

// Copy icons directory
const iconsDir = path.join(ROOT, 'icons');
const iconsDest = path.join(SITE, 'icons');
fs.mkdirSync(iconsDest, { recursive: true });
for (const file of fs.readdirSync(iconsDir)) {
  fs.copyFileSync(path.join(iconsDir, file), path.join(iconsDest, file));
  console.log(`  copied icons/${file}`);
}

console.log('\nBuild complete → _site/');
