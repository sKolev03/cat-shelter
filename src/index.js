import http from 'http';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
    let html = '';

    switch (req.url) {
        case '/':
            html = await homeView();
            break;
        case '/cats/add-breed': 
            html = await addBreedView();
            break;
        case '/cats/add-cat':
            html = await addCatView();
            break;
        case '/styles/site.css': 
            const siteCss = await fs.readFile('./src/styles/site.css', { encoding: 'utf-8' });

                res.writeHead(200, {
                'Content-Type': 'text/css',
            });

            res.write(siteCss);
            return res.end();
        default:
            return res.end();
    }

    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    res.write(html);

    res.end();
});


async function homeView() {
    const homeHtml = await fs.readFile('./src/views/home/index.html', { encoding: 'utf-8' });

    return homeHtml;
}

async function addBreedView() {
    const html = await fs.readFile('./src/views/addBreed.html', { encoding: 'utf-8' });

    return html;
}

async function addCatView(){
    const html = await fs.readFile('./src/views/addCat.html', { encoding: 'utf-8' });

    return html;
}

server.listen(5000);

console.log('Server is listening on http://localhost:5000');