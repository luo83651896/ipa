var http = require("http");  
var fs = require("fs");  
var mudUrl = require('url');  
  
server = http.createServer(onRequest);  
server.listen(process.env.PORT || 5000);  
  
function onRequest(request, response){  
    if (request.method == "GET"){  
        if (request.url == '/'){  
            response.writeHead(200, {'Content-Type': 'text/plain'});  
            response.write("hello node.js");  
            response.end();  
        }  
        else if (request.url == '/favicon.ico'){  
            //http://127.0.0.1:8080/  
            fs.readFile("server/update.ico", function(err, bytes){  
                if (err){  
                    console.log(err);  
                }  
                else{  
                    response.writeHead(200, {'Content-Type': 'image/x-icon'});  
                    response.write(bytes);  
                    response.end();  
                }  
            });  
        }  
        else if (request.url == '/test.html'){  
             fs.readFile("server/test.htm", function(err, bytes){  
                if (err){  
                    console.log(err);  
                }  
                else{  
                    response.writeHead(200, {'Content-Type': 'text/html'});  
                    response.write(bytes);  
                    response.end();  
                }  
            });  
        }  
        else if (request.url == '/server/test.jpg'){  
            fs.readFile("server/test.jpg", function(err, bytes){  
                if (err){  
                    console.log(err);  
                }  
                else{  
                    response.writeHead(200, {'Content-Type': 'image/jpeg'});  
                    response.write(bytes);  
                    response.end();  
                }  
            });  
        }  
        else if (request.url.substring(0, 10) == '/interface'){  
            var params = mudUrl.parse(request.url, true);  
            try{  
                var id = params.query['id'];  
                var name = params.query['name'];  
                var wd = params.query['wd'];  
                console.log("id = " + id + " name = " + name + " wd = " + wd);  
                var jsonData = {};  
                jsonData['code'] = 200;  
                jsonData['key'] = "yes";  
                var strJson = JSON.stringify(jsonData);  
                response.writeHead(200, {'Content-Type': 'text/plain'});  
                response.write(strJson);  
                response.end();  
            }  
            catch(error){  
                console.log(error);  
            }  
            //console.log(params);  
            //console.log(params.query);  
        }  
        else{  
            response.writeHead(404, {'Content-Type': 'text/html'});  
            response.write("<html>\  
            <body>\  
            <p>can not find the page!<p>\  
            </body>\  
            </html>");  
            response.end();  
        }  
    }  
    else if (request.method == "POST"){  
        response.writeHead(200, {'Content-Type': 'text/plain'});  
        response.end('Hello World post\n');  
    }  
}  
