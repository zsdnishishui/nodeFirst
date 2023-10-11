'use strict';

var readFileToArr = require('./http.js');

readFileToArr('test.txt', function(array){
    console.log(array)
})