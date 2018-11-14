var optFile = require ('./optFile');
var url = require('url');
var querystring = require('querystring');

var readFile = function (path, response) {
    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8;'});
    optFile.readFile(path, function (data) {
        response.write(data);
        response.end('');
    });
}

module.exports = {
    login: function (request, response) {
        var rData = url.parse(request.url, true).query;
        console.log(rData);
        if (rData['email'] !== undefined) {
            console.log(rData['email']);
        };

        readFile('./file/login.html', response);
    },
    register: function (request, response) {
        var post = '';
        request.on('data', function (chunk) {
            post += chunk;
        });
        request.on('end', function () {
            post = querystring.parse(post);
            console.log(post['emial']);
        });
        readFile('./file/register.html', response);
    },
    writeFile: function (request, response) {
        var data = 'this is the content writeting on';
        optFile.writeFile('./file/writeFile.txt', data, function (content) {
            response.write(content);
            response.end('');
        });
    },
    showImg: function (request, response) {
        response.writeHead(200, {'Content-Type': 'image/jpeg'});
        optFile.readImg('./imgs/baidu.png', response);
    }
};