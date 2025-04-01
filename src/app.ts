import { readFileSync } from 'fs';
import { createSecureServer } from 'http2';

const server = createSecureServer(
  {
    key: readFileSync('./keys/server.key'),
    cert: readFileSync('./keys/server.pem'),
  },
  (req, res) => {
    // res.writeHead(200, { 'content-type': 'text/html' });
    // res.write(`<h1>URL: ${req.url}</h1>`);
    // res.end();

    // const data = { name: 'jhon doe', age: 30, city: 'New York' };
    // res.writeHead(200, { 'content-type': 'application/json' });
    // res.end(JSON.stringify(data));

    if (req.url === '/') {
      const htmlFile = readFileSync('./public/index.html', 'utf-8');
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(htmlFile);
      return;
    }

    if (req.url?.endsWith('.js')) res.writeHead(200, { 'content-type': 'application/javascript' });
    if (req.url?.endsWith('.css')) res.writeHead(200, { 'content-type': 'text/css' });

    try {
      const responseContent = readFileSync(`./public${req.url}`, 'utf-8');
      res.end(responseContent);
    } catch (error) {
      res.writeHead(404, { 'content-type': 'text/html' });
      res.end();
    }
  },
);

server.listen(8080, () => {
  console.log(`Server runnin in http://localhost:8080`);
});
