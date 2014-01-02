lego.chcontainer_init = function () {
    $('.b-chcontainer__item_loc').click(function () {
        $('.b-chcontainer__item__img_geoloc').attr('src', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTAiIGhlaWdodD0iMTEwIj48Y2lyY2xlIHN0cm9rZT0iIzRENEQ0RCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSI1NS4xMzgiIGN5PSI1Ni4xMTciIHI9IjQxLjMwNCIgZmlsbD0ibm9uZSIvPjxsaW5lIHN0cm9rZT0iIzRENEQ0RCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxOC44NzUiIHkxPSI1Ni4xMzUiIHgyPSI0Ljg3NSIgeTI9IjU2LjEzNSIgZmlsbD0ibm9uZSIvPjxsaW5lIHN0cm9rZT0iIzRENEQ0RCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSI5MS44NzUiIHkxPSI1Ni4xMzUiIHgyPSIxMDQuODc1IiB5Mj0iNTYuMTM1IiBmaWxsPSJub25lIi8+PGxpbmUgc3Ryb2tlPSIjNEQ0RDREIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjU0Ljg3NSIgeTE9IjE5LjEzNSIgeDI9IjU0Ljg3NSIgeTI9IjYuMTM1IiBmaWxsPSJub25lIi8+PGxpbmUgc3Ryb2tlPSIjNEQ0RDREIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjU0Ljg3NSIgeTE9IjkzLjEzNSIgeDI9IjU0Ljg3NSIgeTI9IjEwNi4xMzUiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGZpbGw9IiNmMDAiIHN0cm9rZT0iI2YwMCIgc3Ryb2tlLXdpZHRoPSIuMjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjU1LjEzOCIgY3k9IjU2LjExNyIgcj0iMTcuMzkxIi8+PC9zdmc+');
        if (lego.getCookie('latitude') === undefined || lego.getCookie('longitude') === undefined) {
//        if (Modernizr.geolocation) {
//            navigator.geolocation.getCurrentPosition(function (a) {
//                    lego.setCookie('latitude', a.coords.latitude);
//                    lego.setCookie('longitude', a.coords.longitude);
//                    lego.setCookie('geoLocationError', 'false');
//                    document.location.href = '/location'
//                },
//                function () {
//                    lego.setCookie('geoLocationError', 'true');
//                    document.location.href = '/location';
//                }
//            );
//        } else {
//            lego.setCookie('geoLocationError', 'true');
//            document.location.href = '/location';
//        }
            lego.geoLocation();
        } else {
            lego.setCookie('geoLocationError', 'false');
            document.location.href = '/location';
        }
        return false;
    });
    $('.b-chcontainer__item_search').click(function () {
        $('.b-chcontainer__item_search').addClass('b-chcontainer__item_invis');
        $('.b-chcontainer__item__form').addClass('b-chcontainer__item_vis');
        return false;
    });
};