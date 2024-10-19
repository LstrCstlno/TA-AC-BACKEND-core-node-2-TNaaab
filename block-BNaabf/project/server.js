var http = require("http")
var fs = require("fs")
var qs = require("querystring")

var newServer = http.createServer(myFunction)

function myFunction(req,res){
    var store = "";
    req.on("data", (chunk) => {
        store += chunk
    });
    if (req.method === "GET" && req.url === "/form") {
        res.setHeader("content-type", "text/HTML")
        fs.createReadStream(`./form.html`).pipe(res)
    }
    req.on("end", () => {
        if(req.method === "POST" && req.url === "/form"){
            res.setHeader("content-type", "text/HTML");
            let parseStore = qs.parse(store)
            res.write(`<h2>${parseStore.name}</h2>`)
            res.write(`<h2>${parseStore.email}</h2>`)
            res.write(`<h2>${parseStore.age}</h2>`)
            res.end();
        }
    })
}

newServer.listen(5678, () => {
    console.log("listening on port 5678")
})