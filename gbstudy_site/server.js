const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.join(__dirname, 'public');
const PORT = Number(process.env.PORT || 3000);
const MIME = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.webmanifest':'application/manifest+json; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.ico':'image/x-icon' };
http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/__health') { res.writeHead(200, {'content-type':'application/json; charset=utf-8'}); return res.end(JSON.stringify({ok:true,site:'GB STUDY'})); }
  const rel = pathname === '/' ? 'index.html' : decodeURIComponent(pathname).replace(/^\/+/, '');
  const file = path.resolve(ROOT, rel);
  if (!file.startsWith(ROOT + path.sep) && file !== path.join(ROOT, 'index.html')) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, {'content-type':'text/plain; charset=utf-8'}); return res.end('Not found'); }
    res.writeHead(200, {'content-type':MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'x-content-type-options':'nosniff', 'referrer-policy':'strict-origin-when-cross-origin'});
    if (req.method === 'HEAD') return res.end();
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log(`GB STUDY is running on http://localhost:${PORT}`));
