
const express = require('express')
const path = require('path')
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync(path.join(__dirname+ '/localhost.key'))
const certificate = fs.readFileSync(path.join(__dirname+ '/localhost.crt'))
const credentials = { key: privateKey, cert: certificate };

const app = express()

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
app.use(express.static('public'))

// app.get('/cookie', function (req, res) {
//     // res.cookie('strict_main', 'StrictMain', { sameSite: 'Strict' })
//     res.sendFile(path.join(__dirname+ '/public/index.html'));
// });
app.get('/a', function (req, res) {
    // res.cookie('strict_main', 'StrictMain', { sameSite: 'Strict' })
    res.set('Origin-Trial', 'Aw0/VBaSpR35KUWf94+YZ7ki6LS06lQzGx33SGIyNe5xdvipD71lVfO/ot9xIhZn9+ntQsN6GlPR2Ys98pnJCAoAAABteyJvcmlnaW4iOiJodHRwczovLzEyNy4wLjAuMTo5NDQzIiwiZmVhdHVyZSI6IlByaXZhY3lTYW5kYm94QWRzQVBJcyIsImV4cGlyeSI6MTY2MTI5OTE5OSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==')
    res.sendFile(path.join(__dirname+ '/public/experiment-a.html'));
});

// app.get('/prtCookie', (req, res) => {
//     console.log('Cookie:')
//     console.log(req.cookies)
//     res.send('Cookie printed')
// })

// const open = require('open')
// open('http://localhost:3000/') 

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);