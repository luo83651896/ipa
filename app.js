var http = require("http");
var url=require("url");
const fs=require("fs");
server = http.createServer(onRequest);
server.listen(process.env.PORT || 80);
//var aa="aaaa";
//console.log("bbb"+aa+"ccc");
//console.log("测试");
function onRequest(req, res){
    var urls=url.parse(req.url, true);
    if (urls.path.match(/\.plist/g))
    {
        var name=urls.path.slice(1,-6);
        //console.log(name);
        var itms="<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\"><plist version=\"1.0\"><dict><key>items</key><array><dict><key>assets</key><array><dict><key>kind</key><string>software-package</string><key>url</key><string>http://127.0.0.1/install/"+name+".ipa</string></dict></array><key>metadata</key><dict><key>bundle-identifier</key><string>*</string><key>bundle-version</key><string>1.0.0</string><key>kind</key><string>software</string><key>title</key><string>App</string></dict></dict></array></dict></plist>";
        res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        res.write(itms);
        res.end();
    }
    else if(req.url.match(/frpc/))
    {
        fs.stat("."+req.url, function (err,stats) {
            if(err)
            {
                res.writeHead(404);
                res.end();
                return null;
            }
            res.writeHead(200, {"Content-Type": "text/plain", "Content-Length": stats.size});
            var stream=fs.createReadStream("."+req.url);
            stream.on("data", function (chunk) {
                res.write(chunk);
            });
            stream.on("end", function () {
                res.end();
            });
            stream.on("error", function () {
                res.end();
            });
        });
    }
    else
    {
        res.writeHead(404);
        res.write(req.url);
        res.end();
    }
    //console.log(urls);

}
