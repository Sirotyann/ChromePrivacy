
const express = require('express')
const path = require('path')
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('../../localhost.key')
const certificate = fs.readFileSync('../../localhost.crt')
const credentials = { key: privateKey, cert: certificate };

const app = express()

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static('public'))

app.get('/cookie', function (req, res) {
    // res.cookie('strict_main', 'StrictMain', { sameSite: 'Strict' })
    res.sendFile(path.join(__dirname+ '/public/index.html'));
});

app.get('/prtCookie', (req, res) => {
    console.log('Cookie:')
    console.log(req.cookies)
    res.send('Cookie printed')
})

// const open = require('open')
// open('http://localhost:3000/') 

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);