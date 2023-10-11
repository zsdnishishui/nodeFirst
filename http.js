'use strict';
// 爬取毒鸡汤
var myRequest = require('request')
var myIconv = require('iconv-lite')
var fs = require('fs');
var readLine = require("readline");
require('date-utils');
const JSON = require("url");
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
/**
 * 按行读取文件内容
 *
 * @param fileName 文件名路径
 * @param callback 回调函数
 *
 * @return 字符串数组
 */
function readFileToArr(fileName, callback) {

    var arr = [];
    var readObj = readLine.createInterface({
        input: fs.createReadStream(fileName)
    });

    // 一行一行地读取文件
    readObj.on('line', function (line) {
        arr.push(line);
    });
    // 读取完成后,将arr作为参数传给回调函数
    readObj.on('close', function () {
        callback(arr);
    });
}
console.log("开启爬虫")
readFileToArr('test.txt', function (array) {
    var intervalId = setInterval(function () {
    request(seedURL, function (err, res, body) {
        var html = myIconv.decode(body, myEncoding);
        var json = JSON.parse(html);
        var jitang = json.data;
        // 去重
        if (array.indexOf(jitang) === -1) {
            var data = new Buffer.from(jitang+'\n')
            // 追加文件
            fs.appendFile('test.txt', data, (err) => {

                // 追加失败
                if(err) {
                    throw err
                } else {
                    // 修复重复添加的bug
                    array.push(jitang)
                }

            })
        }

    })
}, 3000);

})


module.exports = readFileToArr;

