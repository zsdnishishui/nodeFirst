const CryptoJS = require('crypto-js');
const axios = require("axios");
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => {
        rl.question(query, answer => {
            resolve(answer);
        });
    });
}
const params = {
    'username': '',
    'password': '',
    'uplcyid': '1',
    'language': '0',
    'code': '',
    'submit': 'submit'};
(async () => {
    try {
        const username = await askQuestion('请输入用户名:');

        // 注意：在实际应用中，应避免在控制台中显示密码，以保证安全性
        const password = await askQuestion('请输入密码:', { hideEchoBack: true });
        const response = await getCode();
        console.log(response.data)
        params.code = response.data.code
        params.username = stringtoaesencrypt(username)
        params.password = stringtoaesencrypt(password)
        // console.log(params)
        const loginResponse = await login(params);
        console.log(loginResponse.data)
    } catch (err) {
        console.error(err);
    } finally {
        rl.close();
    }
})();


async function getCode(){
// 设置headers
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    // 登录的post请求
    const response =await axios.post('http://*****', {'submit': 'submit'}, { headers })
    // console.log('response:',response.data)
    return response;
}
async function login(params){
// 设置headers
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };

    // 登录的post请求
    const response =await axios.post('http://****', params, { headers })
    // console.log('response:',response.data)
    return response;
}
function stringtoaesencrypt(data){
    var key  = CryptoJS.enc.Latin1.parse(encrypt_config_key.substring(0,16));
    var iv   = CryptoJS.enc.Latin1.parse(encrypt_config_iv.substring(0,16));
    var encrypted = CryptoJS.AES.encrypt(data,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});
    return encrypted.toString();
}
