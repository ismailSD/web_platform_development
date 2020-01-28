var http = require('http');

http.createServer(function(req,res){
    // the replace function removes any query strings and slashes
    // the toLowerCase functions makes it lower case 
    path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path) {
        case '':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('Homepage');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/htm' });
            res.end('Hello world');
            break;
        case '/img/logo.jpg':
            serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('Not Found');
            break;
        }
    }).listen(3000);
    
console.log('Server started on localhost:3000; press Ctrl-C to terminate....');
