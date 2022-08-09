const path = require('path')
const express = require('express')
const open = require('open')
const app = express()
app.use(express.static('public'))

const port = 9000

function getTime() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

app.get('/', function (req, res) {
    console.log(`visit home page at ${getTime()}`);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/subpage', function (req, res) {
    console.log(`visit sub page at ${getTime()}`);
    res.sendFile(path.join(__dirname + '/subpage.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    open('http://localhost:9000')
})