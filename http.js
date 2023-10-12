'use strict';
// 爬取毒鸡汤
const axios = require("axios");
const fs = require('fs');
const readLine = require("readline");
let jiTangArray = []
let liZhiTangArray = []
const jiTangFileName = 'test.txt'
const liZhiFileName = 'lizhi.txt'
let shiArray = []
const shiFileName = 'shi.txt'
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
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
        callback(arr)
    });
}
function getRes(array, fileName,seedURL,func) {
    axios.get(seedURL).then(resp => {
        const jitang = func(resp);
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
}

function startJiTang(){
    readFileToArr(jiTangFileName, function (array){
        jiTangArray = array;
    })
}
function startLiZhi(){
    readFileToArr(liZhiFileName, function (array){
        liZhiTangArray = array;
    })
}
function startShi(){
    readFileToArr(shiFileName, function (array){
        shiArray = array;
    })
}

const repeated = async () => {
    while (true){
        getRes(jiTangArray,jiTangFileName,'https://www.iamwawa.cn/home/dujitang/ajax', function (resp){
            return resp.data.data
        })
        // 由于这个网站有3秒钟的限制
        await sleep(3000)
        getRes(jiTangArray,liZhiFileName,'https://www.iamwawa.cn/home/lizhi/ajax',function (resp){
            return resp.data.data
        })
        await sleep(3000)
        getRes(shiArray,shiFileName,'https://www.iamwawa.cn/home/shici/ajax',function (resp){
            const data = resp.data.data;
            return data.content+"|"+data.author+"|"+data.title
        })
        await sleep(3000)
    }
}

function start(){
    startJiTang()
    startLiZhi()
    startShi()
    repeated()


}
module.exports = start;

