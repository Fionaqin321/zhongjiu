let baseUrl = "http://localhost/zhongjiu"; //基础路径（必须是绝对路径）
define(['jquery'], function($) {
    return {
        render: function() {
            var reg = {
                "regName": /^[A-z]{6,16}/,
                "cellPhone": /^1[35789]\d{9}$/,
                "pwd": /^.{6,16}$/
            }
            var inputs = $('.form .regTest'); // 需要验证正则的input
            var pass = $('#pwdRepeat'); // 确认密码
            var submit = $('.btn-regist'); // 提交按钮

            inputs.each((idx, item) => {
                // 输入的时候进行正则验证
                $(item).on('input', function() {
                    if (reg[item.id].test(this.value)) {
                        // 正则验证通过
                        item.dataset.pass = true;
                        $(item).parent().find('.info').removeClass('show');
                        $(item).parent().find('.success').addClass('show');
                    } else {
                        item.dataset.pass = false;
                        $(item).parent().find('.info').addClass('show');
                        $(item).parent().find('.success').removeClass('show');
                    }
                })
            })


            // 确认密码
            $('#pwdRepeat').on('input', function() {
                if (this.value === $('#pwd').val()) {
                    this.dataset.pass = true;
                    $(this).parent().find('.info').removeClass('show');
                    $(this).parent().find('.success').addClass('show');
                } else {
                    this.dataset.pass = false;
                    $(this).parent().find('.info').addClass('show');
                    $(this).parent().find('.success').removeClass('show');
                }
            })

            // 点击按钮获得验证码
            var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
            $('.getCode').on('click', function() {
                var str = '';
                while (str.length < 4) {
                    var iNum = parseInt(Math.random() * 100)
                    while (iNum > 36) {
                        iNum = parseInt(Math.random() * 100)
                    }
                    str += arr[iNum];
                }
                $('#syscheckCode').val(str.toUpperCase());
                $('#syscheckCode')[0].dataset.pass = true;
            });

            // 用户是否勾选了用户协议
            $('.checkbox').on('click', function() {
                // console.log($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    this.dataset.pass = true;
                    $('#checkAgreement_info').removeClass('show');
                } else {
                    this.dataset.pass = false;
                    $('#checkAgreement_info').addClass('show');
                }
            })

            $('.btn-regist').on('click', function() {
                let allPass = document.querySelectorAll('.form input[data-pass="true"]');
                // console.log(allPass.length);
                if (!$('.checkbox').is(':checked')) {
                    $('#checkAgreement_info').addClass('show');
                    return;
                }
                if (allPass.length === 6) {
                    $.ajax({
                        type: "post",
                        url: `${baseUrl}/interface/regist.php`,
                        data: {
                            username: $('#regName').val(),
                            phone: $('#cellPhone').val(),
                            passWord: $('#pwd').val()
                        },
                        dataType: "json",
                        success: function(res) {
                            console.log(res.status);
                            if (res.status) {
                                location.href = `${baseUrl}/src/html/login.html`;
                            } else {
                                alert(res.msg);
                            }
                        }
                    });
                }
            })
        }
    }
})