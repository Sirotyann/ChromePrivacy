
const express = require('express')
const path = require('path')
const fs = require('fs');
const http = require('http');
const https = require('https');
// const privateKey = fs.readFileSync('../localhost.key')
// const certificate = fs.readFileSync('../localhost.crt')
const privateKey = fs.readFileSync('../localhost-key.pem')
const certificate = fs.readFileSync('../localhost.pem')
const credentials = { key: privateKey, cert: certificate };
const open = require('open');
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static('public', {
    setHeaders: function (res, path, stat) {
        res.setHeader('supports-loading-mode', 'fenced-frame');
        res.setHeader('x-allow-fledge', 'true');
        res.set('Origin-Trial', 'Aw0/VBaSpR35KUWf94+YZ7ki6LS06lQzGx33SGIyNe5xdvipD71lVfO/ot9xIhZn9+ntQsN6GlPR2Ys98pnJCAoAAABteyJvcmlnaW4iOiJodHRwczovLzEyNy4wLjAuMTo5NDQzIiwiZmVhdHVyZSI6IlByaXZhY3lTYW5kYm94QWRzQVBJcyIsImV4cGlyeSI6MTY2MTI5OTE5OSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==');
    }
}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('supports-loading-mode', 'fenced-frame');
    res.setHeader('x-allow-fledge', 'true');
    res.set('Origin-Trial', 'Aw0/VBaSpR35KUWf94+YZ7ki6LS06lQzGx33SGIyNe5xdvipD71lVfO/ot9xIhZn9+ntQsN6GlPR2Ys98pnJCAoAAABteyJvcmlnaW4iOiJodHRwczovLzEyNy4wLjAuMTo5NDQzIiwiZmVhdHVyZSI6IlByaXZhY3lTYW5kYm94QWRzQVBJcyIsImV4cGlyeSI6MTY2MTI5OTE5OSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==');
    // res.setHeader('Permissions-Policy', 'join-ad-interest-group=(), run-ad-auction=()');
    next();
});

app.get('/', function (req, res) {
    console.log("index page visited");
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/reporting', function (req, res) {
    console.log(`reporting at ${getTime()}`, req.body);
    res.send('OK');
});

app.get('/daily_update_url', function (req, res) {
    console.log(`daily_update_url called at ${getTime()}`);
    res.send('daily update')
});

function getTime() {
    const now = new Date();
    return `${now.getHours()}:${now.getSeconds()}`;
}
// const open = require('open')
// open('http://localhost:3000/') 

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(9000);
httpsServer.listen(9443);

open('https://localhost:9443')
// open('https://127.0.0.1:9443') 