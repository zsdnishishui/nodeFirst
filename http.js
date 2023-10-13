// axios请求
const axios = require("axios");
// 文件模块
const fs = require('fs');
// 读取文件的每一行
const readLine = require("readline");
// 鸡汤数组，用let 修饰因为这个数组会变化
let jiTangArray = []
let liZhiTangArray = []
let shiArray = []
const jiTangFileName = 'test.txt'
const liZhiFileName = 'lizhi.txt'
const shiFileName = 'shi.txt'
// 类似java的sleep方法
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

// 获取爬取结果
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

/**
 * 由于网站有限制，所以每三秒爬取一次
 */
function repeated(){
    setInterval(function () {
            getRes(jiTangArray,jiTangFileName,'https://www.iamwawa.cn/home/dujitang/ajax', function (resp){
                return resp.data.data
            })
            getRes(jiTangArray,liZhiFileName,'https://www.iamwawa.cn/home/lizhi/ajax',function (resp){
                return resp.data.data
            })
            getRes(shiArray,shiFileName,'https://www.iamwawa.cn/home/shici/ajax',function (resp){
                const data = resp.data.data;
                if (data.content){
                    return data.content+"|"+data.author+"|"+data.title
                }else{
                    return null
                }

            })
    }, 3000)
}
function start(){
    // 初始化数据
    startJiTang()
    startLiZhi()
    startShi()
    // 开始爬取
    repeated()
}
module.exports = start;

