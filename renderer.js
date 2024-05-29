$(document).ready(function () {
    $('#submit').click(function () {
        var username = $("#username").val();
        if (username == "") {
            $("#error").html('用户名不能为空!');
            return;
        }
        var password = $("#password").val();
        if (password == "") {
            $("#error").html('密码不能为空!');
            return;
        }
        var code = ""
        $.ajax({
            url: '***',
            type: 'POST',
            data: 'submit=submit',
            async: false,
            timeout: 30000,
            success: function(data) {
                code = data.code
            }
        });
        $.ajax({
            url: '******',
            type: 'POST',
            data: 'username=' + encodeURIComponent(stringtoaesencrypt(username)) + '&password=' + encodeURIComponent(stringtoaesencrypt(password))+'&uplcyid=1&language=0&code='+code+'&submit=submit',
            async: false,
            timeout: 30000,
            success: function(data) {
                if(!data){
                    return;
                }
                if (data.indexOf('0#') > -1) {
                    $("#error").html(data);
                    return false;
                } else {
                    $("#error").html("登录成功");
                }
            }
        });
    });
});
CryptoJS.pad.ZeroPadding={pad:function(a,c){var b=4*c;a.clamp();a.sigBytes+=b-(a.sigBytes%b||b)},unpad:function(a){for(var c=a.words,b=a.sigBytes-1;!(c[b>>>2]>>>24-8*(b%4)&255);)b--;a.sigBytes=b+1}};

function stringtoaesencrypt(data) {
    var encrypt_config_key = "222";
    var encrypt_config_iv = "1111";
    var key = CryptoJS.enc.Latin1.parse(encrypt_config_key.substring(0, 16));
    var iv = CryptoJS.enc.Latin1.parse(encrypt_config_iv.substring(0, 16));
    var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return encrypted.toString();
}