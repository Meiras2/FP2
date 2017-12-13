var fs = require('fs');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');

var año = 2017;
var url = "https://2.bp.blogspot.com/-LzNfDk2p1k0/WgudsmXScdI/AAAAAAAAPQQ/KIpoX_kZnU401pWgqNx_Wtv82ecjIk_1QCEwYBhgL/s320/Pass%2BThe%2BTime%2BFor%2BScience.jpg";
filename = url.split("/").pop();
filename = filename.replace(/%[0-9A-Z]{2}/g, " ");

function download(url, año, filename, callback) {
    request.head(url, año, function(err, res, body) {
        request(url).pipe(fs.createWriteStream(año + '/' + filename)).on('close', callback);
    });
}

function getFilename(url) {
    console.log(url);
    var filename = url.split('/').pop();
    filename = filename.replace(/%[0-9A-Z]{2}/g, " ");
    return filename;
}

function downloadPage(enlace) {
    request(enlace, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('.post-outer').each(function() {
                var data = $(this);
                var link = data.find('.separator > a').attr('href');
                if (!link) return true; //Saltar el loop
                name = link.split("/").pop();
                var date = new Date(data.find('abbr.published').attr('title'));
                download(link, date.getFullYear(), name, function() {
                    console.log(name);
                });
            });
        }
        var next = $('.blog-pager-older-link').attr('href');
        downloadPage(next);
    });
}

downloadPage('http://crestftgcaptions.blogspot.com.es/?zx=f4bc84cb82022acf');