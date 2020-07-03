let baseUrl = "http://localhost/zhongjiu"; //基础路径（必须是绝对路径）
let index = 0; // 记录当前div的索引
$('.brandA-wrap').append($('.scroll-A').first().clone()); // 克隆第一个div 并追加到容器的尾部
let len = $('.scroll-A').length; // div的个数

// 底部的滑块
let curIndex = 0;
$('.scroll-wrap').append($('.scroll-brand').first().clone()); // 克隆第一个div 并追加到容器的尾部
let len2 = $('.scroll-brand').length;
// console.log(len2);


define(['jquery'], function($) {
    return {
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
            let speed = '-188'; // 设置移动的距离
            $('.prev').on('click', function() {
                index++;
                if (index >= len) {
                    index = 0;
                }
                let left = index * speed;
                // console.log(index);
                // console.log(left);
                $('.brandA-wrap').css('left', left);
            });

            $('.next').on('click', function() {
                index--;
                if (index < 0) {
                    index = len - 1;
                }
                let left = index * speed;
                // console.log(index);
                // console.log(left);
                $('.brandA-wrap').css('left', left);
            });
        },

        // 滑动切换
        slide2: function() {
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


        render: function() {
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getall.php`,
                dataType: "json",
                success: function(res) {
                    // console.log(res);
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