let baseUrl = "http://localhost/zhongjiu"; //基础路径（必须是绝对路径）
define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function() {
            $('#loginsubmit').on('click', function() {
                let userName = $('#loginname').val(); // 用户名
                let pwd = $('#password').val(); // 密码
                if (!userName) {
                    $('#checkCode_error').text('用户名不能为空');
                    $('.tips_error').addClass('show');
                    return;
                }
                if (!pwd) {
                    $('#checkCode_error').text('密码不能为空');
                    $('.tips_error').addClass('show');
                    return;
                }

                if (userName && pwd) {
                    $.ajax({
                        type: "post",
                        url: `${baseUrl}/interface/login.php`,
                        data: {
                            username: userName,
                            password: pwd
                        },
                        dataType: "json",
                        success: function(res) {
                            console.log(res.isLogin);
                            if (res.isLogin) { // 如果用户登录成功
                                $('.tips_error').removeClass('show');
                                let loginObj = {
                                    isLogin: res.isLogin,
                                    userName: userName
                                }
                                cookie.set('login', JSON.stringify(loginObj), 7)
                                location.href = 'http://localhost/zhongjiu/src/html/index.html';
                            } else { // 用户登录失败
                                $('.tips_error').addClass('show');
                                $('#checkCode_error').text(res.msg);
                            }
                        }
                    });
                }
            })
        }
    };
})