'use strict';
// 爬取毒鸡汤
var axios = require("axios")
var fs = require('fs');
var readLine = require("readline");
var seedURL = 'https://www.iamwawa.cn/home/dujitang/ajax';

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
        axios.get(seedURL).then(resp => {
            var jitang = resp.data.data;
            console.log(jitang)
            // 去重
            if (jitang && array.indexOf(jitang) === -1) {
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

