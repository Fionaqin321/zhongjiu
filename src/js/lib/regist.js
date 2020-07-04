define(['jquery'], function($) {
    return {
        render: function() {
            var reg = {
                "regName": /^[A-z]{5,15}/,
                "cellPhone": /^1[35789]\d{9}$/,
                "pwd": /^.{6,16}$/
                    // "email": /^[A-z]\w{5,15}@[A-z0-9-]{2,}\.[A-z]{2,7}\.?[A-z]*$/
            }
            var inputs = $('.form .regTest'); // 需要验证正则的input
            var pass = $('#pwdRepeat'); // 确认密码
            var sysCode = $('#syscheckCode') // 手机验证码
                // var protocol = $('.checkbox'); // 用户协议
            var submit = $('.btn-regist'); // 提交按钮

            console.log(inputs);

            // 提交按钮
            $('.btn-regist').on('click', function() {
                console.log($('.checkbox').is(':checked'));
                // $('.checkbox').is(':checked')
            })

            function check() {
                // 用户协议
                var allPass = document.querySelectorAll('#myform>input[data-pass="true"]');
                if (allPass.length === 5) {
                    submit.removeAttribute('disabled');
                }
            }

            // 确认密码
            pass.oninput = function() {
                    if (this.val() === $('#pwd').val()) {
                        // passCheck.innerHTML = '通过验证';
                        this.dataset.pass = true;
                    } else {
                        // passCheck.innerHTML = '两次输入的密码不同，请重新输入';
                        this.dataset.pass = false;
                    }
                    check();
                }
                // 验证码

            inputs.each((idx, item) => {
                item.oninput = function() {
                    if (reg[item.id].test(this.value)) {
                        // 验证通过
                        // $('.blank').addClass('show');
                        item.dataset.pass = true;
                    } else {
                        // 验证未通过;
                        $('.error').addClass('show');
                        item.dataset.pass = false;
                    }
                    // console.log(item.dataset.pass);
                    check();
                }
            })
        }
    }
})