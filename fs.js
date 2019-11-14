let fs = require('fs');

function log(str){
    console.log(str);
}

//注意目录是相对路径，加上./
let file = './file/test.txt';


/*说明
 *@method readFile 读文件 异步
 *@param{String file, function callback} 
 * file代表读取文件名，包含路径 
 * code代表以何种编码格式读取文件 默认为utf-8  可忽略
 * callback则是回调函数
 * Node.js标准的回调函数：第一个参数代表错误信息，第二个参数代表结果。
*/
fs.readFile(`${file}`, 'utf-8', (err, data)=>{
    if (err){
        //读取失败
        log(err);
    } else {
        /* 
         *如果不传入编码格式utf-8，打印出文件的数据将是个Buffer类型，需要转化为字符串
         *Buffer对象是一个包含0或任意个字节的数组（和Array不同）
         *Buffer转字符串  data.toString('utf-8');
         *String转Buffer  Buffer.from(text, 'utf-8');
         */
        log(data + 'read async');
        //log(data.toString());
    }
});

/*说明
 *@method readFileSync 读文件 同步
 * 同步方法没有回调，直接通过函数返回data 
 * 同步读取文件发生错误需要通过try catch捕获
*/
try{
    let data = fs.readFileSync(`${file}`, 'utf-8');
    log(data + "read sync");
} catch(e){
    log(e);
}

/*说明
 *@method readFile 写文件 异步
 *@param{file, content callback} 
 * String file代表写入内容的文件名，包含路径  
 * content代表写入的内容
 * {flag: "a"}代表fs.appendFile在文件追加内容   不加此参数则是覆盖写入
 * function callback则是回调函数
 */
let content = "write content===";

fs.writeFile(`${file}`, content, {flag: "a"}, (err, data)=>{
    if (err){
        log(err);
    } else{
        log("write success");
    }
});

//同步写内容
fs.writeFileSync(`${file}`, content);

//fs.stat() 用于文件或目录的信息，如文件大小，创建时间，是否目录，是否文件，最后修改时间
fs.stat(`${file}`, function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});

/*
使用同步还是异步

于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。
*/