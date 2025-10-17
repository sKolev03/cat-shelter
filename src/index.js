import http from 'http';
import fs from 'fs/promises';

import cats from './cats.js';

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
            const siteCss = await readFile('./src/styles/site.css');

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

function readFile(path) {
    return fs.readFile(path, { encoding: 'utf-8' });
}

async function homeView() {
    const homeHtml = await readFile('./src/views/home/index.html');

    const catsHtml = cats.map(cat => catTemplate(cat)).join('\n');
    const result = homeHtml.replace('{{cats}}', catsHtml);

    return result;
}

async function addBreedView() {
    const html = await readFile('./src/views/addBreed.html');

    return html;
}

async function addCatView(){
    const html = await readFile('./src/views/addCat.html');
    
    return html;
}

function catTemplate(cat) {
    return `
    <li>
        <img src="${cat.imageUrl}" alt="${cat.name}">
        <h3>${cat.name}</h3>
        <p><span>Price: </span>${cat.price}$</p>
        <p><span>Breed: </span>${cat.breed}</p>
        <p><span>Description: </span>${cat.description}</p>
        <ul class="buttons">
            <li class="btn edit"><a href="">Change Info</a></li>
            <li class="btn delete"><a href="">New Home</a></li>
         </ul>
    </li>
`;
}

server.listen(5000);

console.log('Server is listening on http://localhost:5000');