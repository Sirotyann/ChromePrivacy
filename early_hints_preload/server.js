const express = require('express')
const path = require('path');
const app = express()

// app.use((req, res, next) => {
//     if (req.query.early_hints !== "true") {
//         return next();
//     }

//     console.log("Write Early Hints ")
//     const CRLF = '\r\n';
//     res.socket.write(`HTTP/2 103 Early Hints ${CRLF}`);
//     res.socket.write(`Link: </style.css>; rel=preload; as=style${CRLF}`);
//     res.socket.write(`Link: </main.js>; rel=preload; as=script${CRLF}`);
//     res.socket.write(CRLF);

//     next();
// });

let index = 0;

const earlyHints = require('early-hints')
app.use(earlyHints([
    { path: '/style.css', rel: 'preload' },
    { path: '/main.js', rel: 'preload', as: 'script' },
    { path: '/font.woff', as: 'font' }
]))

app.use(express.static('public'));



app.get('/early_hints', function (req, res) {

    console.log("Write Early Hints / " + index++)
    const CRLF = '\r\n';
    res.socket.write(`HTTP/1.1 103 ${CRLF}`);
    res.socket.write(`Link: </style.css>; rel=preconnect; as=style${CRLF}`);
    res.socket.write(`Link: </main.js>; rel=preconnect; as=script${CRLF}`);
    res.socket.write(CRLF);


    setTimeout(() => {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    }, 2000)

});



app.get('/negative', function (req, res) {
    if (req.query.early_hints === "true") {
        console.log("Write Early Hints /negative " + index++)
        const CRLF = '\r\n';
        res.socket.write(`HTTP/1.1 103 Early Hints ${CRLF}`);
        res.socket.write(`link: <https://cdn.shopify.com>; rel=preconnect, <https://cdn.shopify.com>; crossorigin; rel=preconnect${CRLF}`);
        res.socket.write(CRLF);
    }

    res.sendFile(path.join(__dirname + '/public/negative.html'));
});




app.listen(3000)