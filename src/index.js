import http from 'http';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
        const homeHtml = await fs.readFile('./src/views/home/index.html', { encoding: 'utf-8' });

        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        res.write(homeHtml);

    } else if (req.url === '/styles/site.css') {
        const siteCss = await fs.readFile('./src/styles/site.css', { encoding: 'utf-8' });

        res.writeHead(200, {
            'Content-Type': 'text/css',
        });

        res.write(siteCss);
    }

    res.end();
});

server.listen(5000);

console.log('Server is listening on http://localhost:5000');