const fs = require('fs');
const  promisify = require('util').promisify;
const  stat = promisify(fs.stat);
const  readdir = promisify(fs.readdir);
//handlebars 模板引擎
const handlebars = require('handlebars');

const source = fs.readFileSync('')

module.exports = async  function (req, res, filePath) {
    try{
        const stats = await stat(filePath);
        if (stats.isFile()){
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            //通过流的方式读出来，一点点吐回客户端
            fs.createReadStream(filePath).pipe(res);
        }else if (stats.isDirectory) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(files.join(','));
        }
    }catch (ex) {
        console.error(ex);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('${filePath} is not a directory or file\n ${ex.toString()}');
    }
}