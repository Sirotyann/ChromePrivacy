const http = require('http')

http.get('http://localhost:8080/', (res) => {
    console.log(`status code : ${res.statusCode}`)
})