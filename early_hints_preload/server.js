const express = require('express')
const path = require('path');
const app = express()
// const earlyHints = require('early-hints')
// app.use(earlyHints([
//   { path: '/style.css', rel: 'preload' },
//   { path: '/main.js', rel: 'preload', as: 'script' }
// ]))

const CRLF = '\r\n'
const PRELOAD = 'preload'

// app.use(express.static('public', {
//     setHeaders: function (res, path, stat) {
//         res.setHeader('supports-loading-mode', 'fenced-frame');
//         res.set('Origin-Trial', 'Aw0/VBaSpR35KUWf94+YZ7ki6LS06lQzGx33SGIyNe5xdvipD71lVfO/ot9xIhZn9+ntQsN6GlPR2Ys98pnJCAoAAABteyJvcmlnaW4iOiJodHRwczovLzEyNy4wLjAuMTo5NDQzIiwiZmVhdHVyZSI6IlByaXZhY3lTYW5kYm94QWRzQVBJcyIsImV4cGlyeSI6MTY2MTI5OTE5OSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==');
//     }
// }));

app.use((req, res, next) => {
    console.log(req.path)
    if (req.path !== '/' && req.path !== 'index.html') {
        return next();
    }

    console.log("Write Early Hints")
    const CRLF = '\r\n';
    res.socket.write(`HTTP/2 103 Early Hints ${CRLF}`);
    res.socket.write(`Link: </style.css>; rel=preload; as=style${CRLF}`);
    res.socket.write(`Link: </main.js>; rel=preload; as=script${CRLF}`);
    res.socket.write(CRLF);

    next();
    console.log("Write Early Hints ends")
});

app.get('/', function (req, res) {
    console.log(" get index")
    res.setHeader('Content-Type', 'text/html');
    res.set('Origin-Trial', 'Aw0/VBaSpR35KUWf94+YZ7ki6LS06lQzGx33SGIyNe5xdvipD71lVfO/ot9xIhZn9+ntQsN6GlPR2Ys98pnJCAoAAABteyJvcmlnaW4iOiJodHRwczovLzEyNy4wLjAuMTo5NDQzIiwiZmVhdHVyZSI6IlByaXZhY3lTYW5kYm94QWRzQVBJcyIsImV4cGlyeSI6MTY2MTI5OTE5OSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==');
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: function (res, path, stat) {
        res.set('Origin-Trial', 'Aw0/VBaSpR35KUWf94+YZ7ki6LS06lQzGx33SGIyNe5xdvipD71lVfO/ot9xIhZn9+ntQsN6GlPR2Ys98pnJCAoAAABteyJvcmlnaW4iOiJodHRwczovLzEyNy4wLjAuMTo5NDQzIiwiZmVhdHVyZSI6IlByaXZhY3lTYW5kYm94QWRzQVBJcyIsImV4cGlyeSI6MTY2MTI5OTE5OSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==');
    }
}));

app.listen(8080)



// const http = require('http')
// const fs = require('fs')
// const earlyHints = require('early-hints')
// console.log(__dirname)
// const server = http.createServer((req, res) => {
//     console.log(req.url)
//     if (req.url === '/') {
//         earlyHints(['/style.css'])(req, res)
//     } else if (req.url === '/style.css') {
//         res.setHeader('Content-Type', 'text/css')
//         return fs.createReadStream(__dirname + `/public/${req.url}`).pipe(res)
//     }

//     res.setHeader('Content-Type', 'text/html')
//     fs.createReadStream(__dirname + '/public/index.html').pipe(res)
// }).listen(9000)