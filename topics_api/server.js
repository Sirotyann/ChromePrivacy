
const express = require('express')
const path = require('path')
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('../localhost-key.pem')
const certificate = fs.readFileSync('../localhost.pem')
const credentials = { key: privateKey, cert: certificate };

const app = express()

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const topics = {
    "connection": "close",
    "x-forwarded-for": "206.180.248.60,::ffff:10.10.10.81,::ffff:10.10.86.232",
    "x-forwarded-proto": "https,http,http",
    "x-forwarded-port": "443,80,80",
    "host": "topics-demo.glitch.me",
    "pragma": "no-cache",
    "cache-control": "no-cache",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
    "sec-ch-ua-mobile": "?0",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "sec-ch-ua-platform": "\"Windows\"",
    "accept": "*/*",
    "sec-browsing-topics": "7;v=\"chrome.1:1:1\"",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    "referer": "https://topics-demo.glitch.me/",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "x-forwarded-host": "topics-demo.glitch.me",
    "traceparent": "00-142ff1cf98854264825b3f891f58f356-22a7046fbd76a4fc-01"
};

app.get('/send-topics', (req, res) => {
    res.send(topics)
})

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);