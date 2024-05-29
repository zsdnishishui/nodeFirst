const element = document.getElementById('submit');
element.addEventListener('click', async function () {
    // 处理click事件的代码
    alert('click');
});

function stringtoaesencrypt(data){
    var key  = CryptoJS.enc.Latin1.parse(encrypt_config_key.substring(0,16));
    var iv   = CryptoJS.enc.Latin1.parse(encrypt_config_iv.substring(0,16));
    var encrypted = CryptoJS.AES.encrypt(data,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});
    return encrypted.toString();
}