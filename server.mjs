import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(fileURLToPath(new URL('./dist/', import.meta.url)));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.ttf':'font/ttf','.pdf':'application/pdf','.mp4':'video/mp4','.webm':'video/webm'};
const server = http.createServer((request, response) => {
  let pathname;
  try {pathname = decodeURIComponent(new URL(request.url,'http://localhost').pathname);}
  catch {response.writeHead(400); response.end('Bad request'); return;}
  const target = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (target !== root && !target.startsWith(root + path.sep)) {response.writeHead(403); response.end('Forbidden'); return;}
  fs.stat(target, (error, stat) => {
    if (error || !stat.isFile()) {response.writeHead(404); response.end('Not found'); return;}
    response.writeHead(200, {'Content-Type':types[path.extname(target)] || 'application/octet-stream','Content-Length':stat.size,'X-Content-Type-Options':'nosniff'});
    if(request.method === 'HEAD') response.end(); else fs.createReadStream(target).pipe(response);
  });
});
server.listen(Number(process.env.PORT || 4173),'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${server.address().port}`));
