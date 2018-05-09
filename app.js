var http = require("http");  
server = http.createServer(onRequest);  
server.listen(process.env.PORT || 80);  
function onRequest(request, response){  
        response.writeHead(200, {'Content-Type': 'text/plain'});  
        response.end('Hello World post\n');   
}  
