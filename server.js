var http = require('http');
var https = require('https');
var path = require('path');
var fs = require('fs');

//同步读取密钥和签名证书
var options = {
    key:fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt')
}
var compression = require('compression');
var express = require('express');
var app = express();
app.use(compression());
app.use(express.static(__dirname + '/build/'));
// 创建服务端

var httpsServer = https.createServer(options,app);
var httpServer = http.createServer(app);
// app.listen(8888, function () {
//     console.log('listen port 8888');
// });

app.get('/',function(req,res,next){
    res.send('Hello Express+https');
});
//https监听3000端口
httpsServer.listen(8888);
//http监听3001端口
httpServer.listen(8887);

console.log('listen')