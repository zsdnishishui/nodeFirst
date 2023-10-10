// 爬取毒鸡汤
var myRequest = require('request')
var myIconv = require('iconv-lite')
require('date-utils');
var myEncoding = "utf-8";
var seedURL = 'https://www.iamwawa.cn/home/dujitang/ajax';
//request模块异步fetch url
function request(url, callback) {
    var options = {
        url: url,
        encoding: null,
        // proxy: 'http://127.0.0.1:8000',
        // headers: headers,
        timeout: 10000 //
    }
    myRequest(options, callback)
}

var intervalId = setInterval(function () {
    request(seedURL, function (err, res, body) {
        var html = myIconv.decode(body, myEncoding);
        var json = JSON.parse(html);
        console.log(json.data);
    })
    // clearInterval(intervalId);	//清除定时器
}, 5000);

