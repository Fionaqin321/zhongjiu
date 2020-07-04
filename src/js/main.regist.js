require.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        regist: "./lib/regist",
        cookie: '../js/cookie'
    }
})

require(['regist'], function(regist) {
    regist.render();
})