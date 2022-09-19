const express = require('express')
const path = require('path');
const app = express()

app.use((req, res, next) => {
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
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(3000)