'use strict';

const start = require('./http.js');
const express = require('express')
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("started port:" + PORT)
start()