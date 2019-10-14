# node
this is node.js static file


const http = require('http');
const chalk = require('chalk');
const conf = require('./config/defaultConfig');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello HTTP!');
});

server.listen(conf.port, conf.hostname, () => {
    const addr = 'http://${conf.hostname}:${conf.port}';
    // const addr = 'http://127.0.0.1:9573';
    // console.log(addr) 
    console.info('Server started at ${chalk.green(addr)}')
    // console.info(addr)

})
await 异步调用  async  必须写在前面 

handlebarsjs.com 模板引擎