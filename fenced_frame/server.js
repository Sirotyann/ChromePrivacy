
const express = require('express')
const path = require('path')
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('../localhost.key')
const certificate = fs.readFileSync('../localhost.crt')
const credentials = { key: privateKey, cert: certificate };

const app = express()

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static('public'))

app.get('/board', function (req, res) {
    res.set('supports-loading-mode', 'fenced-frame')
    res.sendFile(path.join(__dirname+ '/public/board.html'));
});


app.get('/demo', function (req, res) {
    console.log("index page visited");
    // res.set('supports-loading-mode', 'fenced-frame')
    res.sendFile(path.join(__dirname+ '/public/index.html'));
});


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(9000);
httpsServer.listen(9443);