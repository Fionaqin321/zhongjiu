require.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        shopcar: "./lib/shopcar",
        cookie: "../js/cookie"
    }
});

require(['shopcar'], function(shopcar) {
    shopcar.init();
    shopcar.render();
});