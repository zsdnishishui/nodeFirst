'use strict';
// 爬取毒鸡汤
const axios = require("axios");
const fs = require('fs');
const readLine = require("readline");
const seedURL = 'https://www.iamwawa.cn/home/dujitang/ajax';
const fileName = 'test.txt'
/**
 * 按行读取文件内容
 *
 * @param fileName 文件名路径
 * @param callback 回调函数
 *
 * @return 字符串数组
 */
function readFileToArr(fileName, callback) {

    const arr = [];
    const readObj = readLine.createInterface({
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

function start(){
    readFileToArr(fileName, function (array){
        setInterval(function () {
            axios.get(seedURL).then(resp => {
                const jitang = resp.data.data;
                console.log(jitang)
                // 去重
                if (jitang && array.indexOf(jitang) === -1) {
                    const data = new Buffer.from(jitang+'\n')
                    // 追加文件
                    fs.appendFile(fileName, data, (err) => {

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
        }, 3000)
    })
}
module.exports = start;

