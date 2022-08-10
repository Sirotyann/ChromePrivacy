
const express = require('express')
const path = require('path')
const fs = require('fs');
const http = require('http');
const https = require('https');
// const privateKey = fs.readFileSync('../../localhost.key', 'utf8');
// const certificate = fs.readFileSync('../../localhost.crt', 'utf8');
const privateKey = fs.readFileSync('../../localhost-key.pem')
const certificate = fs.readFileSync('../../localhost.pem')
const credentials = { key: privateKey, cert: certificate };

const app = express()
// const port = 3000

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require('cors');
app.use(cors({
    origin: 'https://localhost:8443'
}));

// const cookieSession = require('cookie-session')
// app.use(cookieSession({
//     name: 'session',
//     keys: ['any_key'],
//     sameSite: 'strict',
//     // Cookie Options
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))

// app.use(express.static('public'))

app.get('/', (req, res) => {
    console.log(req.cookies)
    res.cookie('lax_embed', 'LaxEmbed', { sameSite: 'Lax' })
    res.cookie('strict_embed', 'StrictEmbed', { sameSite: 'Strict' })
    res.cookie('none_embed', 'NoneEmbed', { sameSite: 'None', secure: true })
    res.sendFile(path.join(__dirname+ '/public/index.html'));
})


app.get('/prtCookie', (req, res) => {
    console.log('Embeded Cookie:')
    console.log(req.cookies)
    res.send('Cookie printed')
})

// const open = require('open')
// open('http://localhost:9000/') 

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(9000);
httpsServer.listen(9443);
