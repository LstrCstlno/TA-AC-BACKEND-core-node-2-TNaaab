let http = require("http")
var fs = require("fs")

var server = http.createServer((req, res) => {
    res.setHeader("content-type", "text")
    fs.createReadStream("./readme.txt").pipe(res)
}).listen(4000)