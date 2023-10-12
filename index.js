'use strict';

const start = require('./http.js');
const express = require('express')
const app = express()
// 使用解析post请求中的表单数据的中间件
app.use(express.json())
const PORT = 3000
app.listen(PORT,function (){
    console.log("started port:" + PORT)
    start()
})
