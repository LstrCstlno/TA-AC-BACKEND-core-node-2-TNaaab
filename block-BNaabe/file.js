var http = require("http");
var qs = require("querystring")
var newServer = http.createServer(myServer)

function myServer(req,res) {
    var store = "";
    console.log(req.headers["content-type"])
    req.on("data", (chunk) => {
        store += chunk;
    })
    req.on("end", () => {
        if(req.method === "POST" && req.url === "/" && req.headers["content-type"] === "application/JSON")
        {
            res.statusCode = 201;
            res.end(store)
        }
        if(req.method === "POST" && req.url === "/" && req.headers["content-type"] === "application/x-www-form-urlencoded")
            {
                res.statusCode = 201;
                var final = qs.parse(store)
                var captain = final["captain"]
                res.end(captain)
            }
    })
}

newServer.listen(7000)

var newServer1 = http.createServer(myServer1)

function myServer1(req,res) {
    var store = "";
    console.log(req.headers["content-type"])
    req.on("data", (chunk) => {
        store += chunk;
    })
    req.on("end", () => {
        if(req.method === "POST" && req.url === "/" && req.headers["content-type"] === "application/json")
        {
            res.setHeader("content-type", "application/JSON")
            res.statusCode = 201;
            res.end(store)
        }
        if(req.method === "POST" && req.url === "/" && req.headers["content-type"] === "application/x-www-form-urlencoded")
            {
                res.setHeader("content-type", "text/html")
                res.statusCode = 201;
                var final = qs.parse(store)
                res.end(JSON.stringify(final))
            }
    })
}

newServer1.listen(9000, () => {
    console.log("i am listening")
})