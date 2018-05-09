var http = require("http");  
const child_process = require('child_process');
server = http.createServer(onRequest);  
server.listen(process.env.PORT || 80);  
function onRequest(request, response){  
        var workerProcess = child_process.exec('./frps -c ./frps.ini', function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
        workerProcess.on('exit', function (code) {
        console.log('子进程已退出，退出码 '+code);
    });
        response.writeHead(200, {'Content-Type': 'text/plain'});  
        response.end('Hello World post\n');   
        console.log('this ok!!!!');
}  
