//http模块  搭建服务器

let http = require('http');
let fs = require('fs');

const b = 1;

b = 2;

console.log(b);


/*
修改完要重启服务器 node index.js
createServer 创建服务器  传入一个回调函数
listen需要告知服务器监听的端口号 不能被占用，随便取一个8888
然后再目录执行命令行（shift+右键  选择Piowershell）  node index.js  这样服务器就打开了
打开浏览器 输入localhost:8888   这样在命令行就能收到打印了

回调函数的两个参数
request 代表传递的参数
response 返还的参数

request


response 返还的参数将会返还到网页上
res.write('index');
res.end();
可以简写为res.end('index');

*/
function log(str) {
    console.log(str);
}

http.createServer((req, res) => {
    log("Hello, http");

    fs.readFile(`./${req.url}`, (err, data) => {
        if (err) {
            log(err);
            res.writeHead(404);
            res.end('404 not find');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
    log(req.url);

    /*     res.write('index');
        res.end(); */
}).listen(8888);