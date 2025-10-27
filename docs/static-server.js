// Simple static file server without external deps
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8000;
const ROOT = path.join(__dirname, 'static');

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

function send(res, status, data, headers = {}) {
    res.writeHead(status, { 'Cache-Control': 'no-cache', ...headers });
    res.end(data);
}

const server = http.createServer((req, res) => {
    try {
        // Map URL to file path
        let urlPath = decodeURIComponent(req.url.split('?')[0]);
        if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

        // Prevent path traversal
        const safePath = path.normalize(urlPath).replace(/^\.\.+/, '');
        const filePath = path.join(ROOT, safePath);

        // If directory, try index.html
        let finalPath = filePath;
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
            finalPath = path.join(filePath, 'index.html');
        }

        if (!fs.existsSync(finalPath)) {
            return send(res, 404, 'Not found');
        }

        const ext = path.extname(finalPath).toLowerCase();
        const mime = mimeTypes[ext] || 'application/octet-stream';

        const stream = fs.createReadStream(finalPath);
        res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'no-cache' });
        stream.pipe(res);
        stream.on('error', () => send(res, 500, 'Internal server error'));
    } catch (e) {
        return send(res, 500, 'Internal server error');
    }
});

server.listen(PORT, () => {
    console.log(`Static server running on http://localhost:${PORT}`);
    console.log(`Serving directory: ${ROOT}`);
});
