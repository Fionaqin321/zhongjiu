require.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        detail: "./lib/detail",
        cookie: './cookie'
    }
});

require(['jquery', 'detail'], function($, detail) {
    // 当页面渲染完成才能获取元素——回调函数（改变代码执行顺序）
    detail.render(function(id, price) {
        $('.btn-append').on('click', function() {
            detail.addItem(id, price, $('.quantity-text').val());
        });
    });
});