requirejs.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        index: "./lib/index",
        cookie: '../js/cookie'
    },
});

require(["index"], function(index) {
    index.tab();
    index.tabs2();
    index.slide();
    index.slide2();
    index.render();
});