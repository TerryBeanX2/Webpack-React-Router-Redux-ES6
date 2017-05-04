var http = require('http');
var path = require('path');
var compression = require('compression');
var express = require('express');
var app = express();
app.use(compression());
app.use(express.static(__dirname + '/react-t'));
app.get('*', function (request, response) {
    //html默认发送index.html
    if (request.params[0].indexOf('.css') == -1 && request.params[0].indexOf('.js') == -1) {
        response.sendFile(path.resolve(__dirname, __dirname + '/react-t/', 'index.html'))
    } else {
    //非html正常发送请求文件
        var arr = request.params[0].split('/');
        response.sendFile(path.resolve(__dirname, __dirname + '/react-t/' + arr[arr.length - 1]))
    }
});
// 创建服务端
app.listen(8888, function () {
    console.log('listen port 8888');
});
