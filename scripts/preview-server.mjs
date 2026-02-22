#!/usr/bin/env node
import http from 'node:http';
import { createReadStream, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const args = process.argv.slice(2);
let root = process.env.ROOT || process.cwd();
let port = Number(process.env.PORT || 8080);
for (let i = 0; i < args.length; i++) {
  if ((args[i] === '--root' || args[i] === '-d') && args[i + 1]) root = args[++i];
  else if ((args[i] === '--port' || args[i] === '-p') && args[i + 1]) port = Number(args[++i]);
}

function send(res, code, headers = {}, body = '') {
  res.writeHead(code, headers);
  res.end(body);
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url || '/');
  const pathname = decodeURIComponent(parsed.pathname || '/');

  if (pathname === '/__stop') {
    send(res, 200, { 'Content-Type': 'text/plain' }, 'Stopping preview server...');
    // Close gracefully then exit
    server.close(() => process.exit(0));
    return;
  }

  // Map to file on disk under root
  let filePath = path.join(root, pathname);
  try {
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      // serve index.html if present
      const indexPath = path.join(filePath, 'index.html');
      if (existsSync(indexPath)) filePath = indexPath;
      else return send(res, 403, { 'Content-Type': 'text/plain' }, 'Forbidden');
    }
    const stream = createReadStream(filePath);
    stream.on('error', () => send(res, 404, { 'Content-Type': 'text/plain' }, 'Not found'));
    // very small content-type map
    const ext = path.extname(filePath).toLowerCase();
    const type =
      ext === '.html'
        ? 'text/html; charset=utf-8'
        : ext === '.css'
          ? 'text/css; charset=utf-8'
          : ext === '.js'
            ? 'application/javascript; charset=utf-8'
            : ext === '.json'
              ? 'application/json; charset=utf-8'
              : ext === '.svg'
                ? 'image/svg+xml'
                : ext === '.png'
                  ? 'image/png'
                  : ext === '.jpg' || ext === '.jpeg'
                    ? 'image/jpeg'
                    : 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    stream.pipe(res);
  } catch (_e) {
    return send(res, 404, { 'Content-Type': 'text/plain' }, 'Not found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Preview server listening on http://localhost:${port}`);
});
