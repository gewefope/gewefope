var lego = {};

lego.getWeather = function (type, b, c) {
    var adress = {
        'main': 'http://api.openweathermap.org/data/2.5/',
        'params': '?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b'
    }, response;
    if (type == 'search') {
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: adress.main + 'find' + adress.params + '&type=like&q=' + b + '&callback=?'
        })
            .done(function (data) {
                response = data;
                return response;
            })
            .fail(function () {
                alert("error");
                return false;
            });

    } else if (type == 'forecast') {

    } else if (type == 'weather') {

    }

};

/**
 *
 * Создаёт cookie со сроком жизни 1 час
 *
 * @param {string} name Имя cookie
 * @param {string} value Значение cookie
 */
lego.setCookie = function (name, value) {
    var age = new Date(new Date().getTime() + 60 * 100000),
        val = value + "; expires=" + age.toUTCString();
    document.cookie = name + "=" + val;
};

/**
 *
 * Читает значение cookie
 *
 * @param {string} name Имя cookie
 * @return {string}  Значение cookie
 */
lego.getCookie = function (name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

/**
 * Получает параметр из url
 *
 * @param name Name of the parameter to get.
 * @return Значение параметра
 */
lego.getURLParameter = function (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
};

/**
 * Определяет местоположение
 *
 */
lego.geoLocation = function () {
    var error;
    if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lego.setCookie("latitude", position.coords.latitude);
            lego.setCookie("longitude", position.coords.longitude);
            console.info("Location successfully determined.");
            lego.setCookie("geoLocationError", "false");
            error = false;
        }, function () {
            console.warn("During detection location the error occurred.");
            lego.setCookie("geoLocationError", "true");
            error = true;
        });

    } else {
        console.warn("During detection location the error occurred.");
        lego.setCookie("geoLocationError", "true");
        error = true;
    }

    return error;
};