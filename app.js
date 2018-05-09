var http = require("http");
//设置端口
var port = 80;
//创建服务
var server = http.createServer(function(req,res){
    res.setHeader('Content-Type','text/plain');
    res.end("hello nodejs");

}).listen(port);
