var http = require("http")
var qs = require("querystring")
let newserver = http.createServer(serverFunction)

function serverFunction(req,res) {
    var head = req.headers[`content-type`]
    console.log(head)
    let store = "";
    req.on("data", (chunk) => {
        store += chunk;
    })
    req.on("end", () =>{
        if(head === "application/x-www-form-urlencoded"){
            var parsed = qs.parse(store)
            res.end(JSON.stringify(parsed))
        };
        if(head === "application/json"){
            var parsed = JSON.parse(store)
            res.end(store)
        }
    })
}

newserver.listen(7000, ()=> {
    console.log("i am listening")
})