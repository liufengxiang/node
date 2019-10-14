const fs = require('fs');
const path = require('path');
const  promisify = require('util').promisify;
const  stat = promisify(fs.stat);
const  readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig');
//handlebars 模板引擎
const handlebars = require('handlebars');
//防止路径出错
const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);   //读出来的buffer
//生成模板
const template = handlebars.compile(source.toString());
module.exports = async  function (req, res, filePath) {
    try{
        const stats = await stat(filePath);
        if (stats.isFile()){
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            //通过流的方式读出来，一点点吐回客户端
            fs.createReadStream(filePath).pipe(res);
        }else if (stats.isDirectory) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(config.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? '/${dir}' : '',
                files
            }
            res.end(template(data));
        }
    }catch (ex) {
        console.error(ex);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('${filePath} is not a directory or file\n ${ex.toString()}');
    }
}