var fs = require('fs');
var request = require('request');
var http = require('http');

var url = "https://2.bp.blogspot.com/-LzNfDk2p1k0/WgudsmXScdI/AAAAAAAAPQQ/KIpoX_kZnU401pWgqNx_Wtv82ecjIk_1QCEwYBhgL/s320/Pass%2BThe%2BTime%2BFor%2BScience.jpg";
filename = url.split("/").pop();
filename = filename.replace(/%[0-9A-Z]{2}/g, " ");
console.log(filename);

/* var download = function(url, filename, callback) {
    request.head(url, function(err, res, body) {
        request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
}

download(url, filename, function() {
    console.log('¡Exito!');
}); */

var file = fs.createWriteStream(filename);
var request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
    response.pipe(file);
});
