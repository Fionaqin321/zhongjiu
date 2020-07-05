require.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        login: "./lib/login",
        cookie: "../js/cookie"
    }
})

require(['login'], function(login) {
    login.tab();
    login.render();
})