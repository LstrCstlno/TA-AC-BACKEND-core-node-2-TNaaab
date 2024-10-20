var http = require("http")
var fs = require("fs")
var qs = require("querystring")
var path = require("path")
var url = require("url")
const userDir = __dirname + "/users/"

var newServer = http.createServer(serverFunction)

function serverFunction(req, res){
    var parsedUrl = url.parse(req.url, true)
    var store = "";
    req.on("data", (chunk) => {
        store += chunk;
    })
    req.on("end", () => {
        if(req.url === "/users" && req.method === "POST"){
            var username = JSON.parse(store).username;
            fs.open(userDir + username + ".json", "wx", (err, fd) => 
                {
                fs.writeFile(fd, store, (err) => {
                    console.log("file is not written");
                    fs.close(fd, (err) => {
                        console.log("ERROR");
                        res.end(`${username} successfully created`)
                    })
                })
            })
        }
        if(parsedUrl.pathname === "/users" && req.method === "PUT"){
            var username = parsedUrl.query.username;
            fs.open(userDir + `/${username}.json`, "r+", (err, fd) => 
                    {
                        if(err){
                            console.log("cannot find file")
                        }
                        fs.ftruncate(fd, (err)=> {
                            if(err){
                                console.log("error")
                            }
                        })
                        fs.writeFile(fd, store, (err) => {
                            if(err){
                                console.log("file is not written");
                            }
                            fs.close(fd, (err) => {
                                if(err){
                                    console.log("ERROR");
                                }
                                res.end(`${username} updated`)
                            })
                        })
                    })
                    }
        })
    if(parsedUrl.pathname === "/users" && req.method === "GET"){
        var username = parsedUrl.query.username
        fs.readFile(userDir + `/${username}.json` , (err, user) => {
            if(err) {
                console.log(`${username} does not exsist`)
            }
            res.end(user);
        })
    }
    if(parsedUrl.pathname === "/users" && req.method === "DELETE"){
        var username = parsedUrl.query.username;
        fs.unlink(userDir + `/${username}.json` , (err, user) => {
            if(err) {
                console.log(`${username} does not exsist`)
            }
            res.end(`${username} deleted`);
        })
    }
            }
newServer.listen(3000, () => {
    console.log("listening on port 3000")
})



// let parsedUrl = url.parse(`/users?username=xyz`, true)

// console.log(parsedUrl.query.username)

