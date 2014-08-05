//!(!window.Zepto && !document.write('<script src="/storage/js/vendor/zepto.min.js"><\/script>'));

Zepto(function($){
//    lego.checkAuth(function(){
//        document.location = '/login';
//    },function(){
//        lego.userInfo_init();
//    });
    lego.userInfo_init();
});