
const express = require('express')
const path = require('path')
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync(path.join(__dirname + '/localhost.key'))
const certificate = fs.readFileSync(path.join(__dirname + '/localhost.crt'))
const credentials = { key: privateKey, cert: certificate };
const open = require('open');
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static('public'))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('supports-loading-mode', 'fenced-frame');
    res.setHeader('x-allow-fledge', 'true');
    // res.setHeader('Permissions-Policy', 'join-ad-interest-group=(), run-ad-auction=()');
    next();
});

app.get('/', function (req, res) {
    console.log("index page visited");
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/reporting', function (req, res) {
    console.log("reporting", req.body);
    res.send('OK');
});

app.get('/publisher', function (req, res) {
    console.log("publisher visited");
    res.sendFile(path.join(__dirname + '/public/publisher.html'));
});

app.get('/ad-container', function (req, res) {
    console.log("ad-container visited");
    res.sendFile(path.join(__dirname + '/public/ad-container.html'));
});

app.get('/join-interest-group', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/join-interest-group.html'));
});

app.get('/bidding-signal-json', function (req, res) {
    console.log("bidding-signal");
    res.sendFile(path.join(__dirname + '/public/bidding-signal.json'));
});

app.get('/daily_update_url', function (req, res) {
    console.log("daily_update_url called");
    res.send('daily update')
});

/**
 * Js files
 */
app.get('/join-interest-group-js', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/join-interest-group.js'));
});

app.get('/bidding-logic-js', function (req, res) {
    console.log("bidding-logic-js");
    res.sendFile(path.join(__dirname + '/public/bidding-logic.js'));
});

app.get('/run-ad-auction-js', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/run-ad-auction.js'));
});

app.get('/decision-logic-js', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/decision-logic.js'));
});

// const open = require('open')
// open('http://localhost:3000/') 

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(9000);
httpsServer.listen(9443);

open('https://example.com:9443') 
// open('https://127.0.0.1:9443') 