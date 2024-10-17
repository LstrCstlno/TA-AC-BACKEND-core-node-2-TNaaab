var http = require("http")

var newserver = http.createServer(serverfunction)

function serverfunction(req, res) {
    let store = ""
    req.on("data", (chunk) => {
        store = store + chunk;
    })
    req.on("end", () => {
        console.log(store)
    })
    res.write(store);
    res.end();
}

newserver.listen(3456, ()=> {
console.log("hehehehe")
})