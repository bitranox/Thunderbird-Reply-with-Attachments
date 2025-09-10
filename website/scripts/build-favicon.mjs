#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { Buffer } from 'node:buffer';

function fileExists(p) {
  try {
    fs.accessSync(p, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

function readPng(p) {
  return fs.readFileSync(p);
}

function makeIco(entries) {
  const count = entries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4); // count

  const dir = Buffer.alloc(16 * count);
  // data offset starts after header + directory
  let offset = 6 + 16 * count;
  const images = [];

  entries.forEach((e, i) => {
    const { width, height, data } = e;
    const view = dir.subarray(i * 16, i * 16 + 16);
    view[0] = width === 256 ? 0 : width; // bWidth
    view[1] = height === 256 ? 0 : height; // bHeight
    view[2] = 0; // bColorCount
    view[3] = 0; // bReserved
    view.writeUInt16LE(1, 4); // wPlanes (1)
    view.writeUInt16LE(32, 6); // wBitCount (32bpp)
    view.writeUInt32LE(data.length, 8); // dwBytesInRes
    view.writeUInt32LE(offset, 12); // dwImageOffset
    images.push(data);
    offset += data.length;
  });

  return Buffer.concat([header, dir, ...images]);
}

function main() {
  const websiteDir = process.cwd();
  const staticDir = path.join(websiteDir, 'static', 'img');
  const srcIconsDir = path.resolve(websiteDir, '..', 'sources', 'icons');

  const candidates = [
    {
      size: 256,
      paths: [path.join(staticDir, 'icon-256.png'), path.join(srcIconsDir, 'icon-256.png')],
    },
    {
      size: 128,
      paths: [path.join(staticDir, 'icon-128.png'), path.join(srcIconsDir, 'icon-128.png')],
    },
    {
      size: 64,
      paths: [path.join(staticDir, 'icon-64.png'), path.join(srcIconsDir, 'icon-64.png')],
    },
    {
      size: 48,
      paths: [path.join(staticDir, 'icon-48.png'), path.join(srcIconsDir, 'icon-48.png')],
    },
    {
      size: 32,
      paths: [path.join(staticDir, 'icon-32.png'), path.join(srcIconsDir, 'icon-32.png')],
    },
    {
      size: 24,
      paths: [path.join(staticDir, 'icon-24.png'), path.join(srcIconsDir, 'icon-24.png')],
    },
    {
      size: 16,
      paths: [path.join(staticDir, 'icon-16.png'), path.join(srcIconsDir, 'icon-16.png')],
    },
  ];

  const chosen = [];
  for (const c of candidates) {
    for (const p of c.paths) {
      if (fileExists(p)) {
        chosen.push({ width: c.size, height: c.size, data: readPng(p) });
        break;
      }
    }
  }

  if (chosen.length === 0) {
    console.error(
      '[favicon] No source PNGs found. Expected icons under website/static/img or sources/icons'
    );
    process.exit(1);
  }

  // Keep only distinct sizes, largest → smallest, limit to common favicon sizes.
  const seen = new Set();
  const sizesOrder = [256, 128, 64, 48, 32, 24, 16];
  const filtered = [];
  for (const s of sizesOrder) {
    const hit = chosen.find((e) => e.width === s && !seen.has(s));
    if (hit) {
      seen.add(s);
      filtered.push(hit);
    }
  }

  const out = makeIco(filtered);
  const outPath = path.join(staticDir, 'favicon.ico');
  fs.writeFileSync(outPath, out);
  console.log(`[favicon] Wrote multi-size ICO with ${filtered.length} image(s) → ${outPath}`);
}

main();
