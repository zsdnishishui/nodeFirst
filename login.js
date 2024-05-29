const CryptoJS = require('crypto-js');
const axios = require("axios");
const readline = require('readline');
const fs = require('fs');
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
// (async () => {
//     try {
//         let username = ''
//         let password = ''
//
//         try {
//             const data = fs.readFileSync('data.txt', 'utf-8');
//             if (data){
//                 const lines = data.split('\n');
//                 username = lines[0];
//                 password = lines[1];
//             }
//         } catch (e) {
//             // console.log('没有找到data.txt文件');
//         }
//         if (username === '' || password === '') {
//             username = await askQuestion('请输入用户名:');
//
//             // 注意：在实际应用中，应避免在控制台中显示密码，以保证安全性
//             password = await askQuestion('请输入密码:', { hideEchoBack: true });
//             params.username = stringtoaesencrypt(username)
//             params.password = stringtoaesencrypt(password)
//         }else{
//             params.username = username
//             params.password = password
//         }
//
//         const response = await getCode();
//         // console.log(response.data)
//         params.code = response.data.code
//         // console.log(params)
//         const loginResponse = await login(params);
//         console.log(loginResponse.data)
//         if (!loginResponse.data.startsWith('0#')) {
//             fs.writeFileSync('data.txt', `${params.username}\n${params.password}\n`, function (err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log('ok.');
//                 }
//             });
//         }
//
//     } catch (err) {
//         console.error(err);
//     } finally {
//         rl.close();
//     }
// })();


async function getCode(){
// 设置headers
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    // 登录的post请求
    const response =await axios.post('http://10.69.3.254:8008/user_auth_verify.cgi', new URLSearchParams({'submit': 'submit'}).toString(), { headers })
    // console.log('response:',response)
    return response;
}
async function login(params){
// 设置headers
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };

    // 登录的post请求
    const response =await axios.post('http://10.69.3.254:8008/portal.cgi', new URLSearchParams(params), { headers })
    // console.log('response:',response.data)
    return response;
}
function stringtoaesencrypt(data){
    var encrypt_config_key = "LRIkEGfMp679amA2";
    var encrypt_config_iv = "VUJ4DzCkM0zTa5XW";
    var key  = CryptoJS.enc.Latin1.parse(encrypt_config_key.substring(0,16));
    var iv   = CryptoJS.enc.Latin1.parse(encrypt_config_iv.substring(0,16));
    var encrypted = CryptoJS.AES.encrypt(data,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});
    return encrypted.toString();
}
