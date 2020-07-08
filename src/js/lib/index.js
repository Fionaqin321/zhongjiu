let baseUrl = "http://localhost/zhongjiu"; //基础路径（必须是绝对路径）

define(['jquery', 'cookie'], function($, cookie) {
    return {
        init: function() {
            // 登录之后实现首页头部信息联动
            if (cookie.get('login')) {
                let loginObj = JSON.parse(cookie.get('login')); //从cookie中获取登录状态
                // console.log(loginObj && loginObj.isLogin);
                if (loginObj && loginObj.isLogin) {
                    $('.login-regin>li').first().addClass('show').siblings().removeClass('show');
                    $('.login-regin>li').first().children('.userName').text(loginObj.userName);
                }
                // 退出登录
                $('.log_out').on('click', function() {
                    // 点击“退出”，修改cookie中的登录状态
                    loginObj.isLogin = false;
                    cookie.set('login', JSON.stringify(loginObj), 7);
                    location.reload();
                })
            }
            // 右侧购物车入口商品数量 
            if (cookie.get('shop')) {
                let shop = JSON.parse(cookie.get('shop'));
                let productNum = 0;
                shop.forEach((item, index) => {
                        // console.log(item);
                        productNum += parseInt(item.num);
                    })
                    // console.log(productNum);
                $('.product-num').text(productNum);
            }
            // 进入购物车页面权限判断
            $('.right-side').on('click', function() {
                if (!cookie.get('login')) {
                    // console.log('afsdfas');
                    alert('请先登录');
                    location.href = 'http://localhost/zhongjiu/src/html/login.html';
                } else {
                    let loginObj = JSON.parse(cookie.get('login'));
                    let isLogin = loginObj.isLogin;
                    if (!isLogin) {
                        alert('请先登录');
                        location.href = 'http://localhost/zhongjiu/src/html/login.html';
                        return;
                    }
                    location.href = 'http://localhost/zhongjiu/src/html/shopcar.html';
                }
            })

        },

        // 

        // 楼梯效果
        floor: function() {
            $(".floor-list>li:not('.last')").hover(function() {
                $(this).addClass('hover');
            }, function() {
                $(this).removeClass('hover');
            });

            // 点击左边的li
            $(".floor-list>li:not('.last')").on('click', function() {
                    $('.floor-list>li>span').removeClass('active');
                    $(this).find('span').addClass('active');
                    // 获取当前点击的li的index
                    let _index = $(this).index();
                    // 获取和当前li相对应的内容块在可视窗口下的位置
                    var top = $('.floors').eq(_index).offset().top;
                    // console.log(top);

                    $('html,body').animate({
                        scrollTop: top
                    }, 500)
                })
                // 浏览器窗口滚动
            $(window).scroll(function() {
                var $top = $(document).scrollTop(); // 当前文档距离顶部的高度
                var firstFloorTop = $('.floors').eq(0).offset().top;
                // console.log(firstFloorTop);
                if ($top > firstFloorTop) {
                    $('.floor-list').fadeIn();
                } else {
                    $('.floor-list').fadeOut();
                }

                let i = Math.round(($top - firstFloorTop) / 732);
                // document.title = $top + '--' + i;
                $('.floor-list>li>span').removeClass('active');
                $('.floor-list>li>span:eq(' + i + ')').addClass('active');
            })

            // 回到顶部
            $('.floor-list>li.last').on('click', function() {
                $('html,body').animate({
                    scrollTop: 0
                }, 0)
            })

        },

        tab: function() {
            $('.tabs1>li').hover(function() {
                let _index = $(this).index();
                $('.tabs1>li').eq(_index).addClass('active').siblings().removeClass('active');
                $('.hotrecommend').eq(_index).addClass('show').siblings().removeClass('show');
            });
        },

        tabs2: function() {
            $('.tabs2>li').hover(function() {
                let _index = $(this).index();
                $(this).children('s').addClass('trangle_bg');
                $(this).siblings().children('s').removeClass('trangle_bg');
                $('.content-right-box').eq(_index).addClass('show');
                $('.content-right-box').eq(_index).siblings().removeClass('show');
            });
        },

        // 滑动切换
        slide: function() {
            let index = 0; // 记录当前div的索引
            $('.brandA-wrap').append($('.scroll-A').first().clone()); // 克隆第一个div 并追加到容器的尾部
            let len = $('.scroll-A').length; // div的个数

            let speed = '-188'; // 设置移动的距离
            $('.prev').on('click', function() {
                index++;
                if (index >= len) {
                    index = 0;
                }
                let left = index * speed;
                $('.brandA-wrap').css('left', left);
            });

            $('.next').on('click', function() {
                index--;
                if (index < 0) {
                    index = len - 1;
                }
                let left = index * speed;
                $('.brandA-wrap').css('left', left);
            });
        },

        // 滑动切换
        slide2: function() {
            // 底部的滑块
            let curIndex = 0;
            $('.scroll-wrap').append($('.scroll-brand').first().clone()); // 克隆第一个div 并追加到容器的尾部
            let len2 = $('.scroll-brand').length;

            let speed = '-550'; // 设置移动的距离
            $('.bd-prev').on('click', function() {
                curIndex++;
                if (curIndex >= len2) {
                    curIndex = 0;
                }
                let left = curIndex * speed;
                console.log(curIndex);
                console.log(left);
                $('.scroll-wrap').css('left', left);
            });

            $('.bd-next').on('click', function() {
                curIndex--;
                if (curIndex < 0) {
                    curIndex = len2 - 1;
                }
                let left = curIndex * speed;
                console.log(curIndex);
                console.log(left);
                $('.scroll-wrap').css('left', left);
            });
        },

        // 页面渲染
        render: function() {
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getall.php`,
                dataType: "json",
                success: function(res) {
                    let temL = '';
                    res.forEach(elm => {
                        temL += `<li>
                                    <a href="${baseUrl}/src/html/details.html?id=${elm.id}">
                                        <img class="lazyload" src="${JSON.parse(elm.pic)[0]}">
                                    </a>
                                    <h3 title="${elm.desc}">${elm.desc}</h3>
                                    <p>￥<span>${elm.price}</span></p>
                                </li>`
                    });
                    $('.content_recont>ul').append(temL);
                }
            });
        }
    };

});