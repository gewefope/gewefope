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
    var result;
    if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lego.setCookie("latitude", position.coords.latitude);
            lego.setCookie("longitude", position.coords.longitude);
            console.info("Location successfully determined.");
            lego.setCookie("geoLocationError", "false");
            result = true;
        }, function () {
            console.warn("During detection location the error occurred.");
            lego.setCookie("geoLocationError", "true");
            result = false;
        });

    } else {
        console.warn("During detection location the error occurred.");
        lego.setCookie("geoLocationError", "true");
        result = false;
    }

    return result;
};;lego.chcontainer_init = function () {
    $('.b-chcontainer__item_loc').click(function () {
        $('.b-chcontainer__item__img_geoloc').attr('src', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTAiIGhlaWdodD0iMTEwIj48Y2lyY2xlIHN0cm9rZT0iIzRENEQ0RCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSI1NS4xMzgiIGN5PSI1Ni4xMTciIHI9IjQxLjMwNCIgZmlsbD0ibm9uZSIvPjxsaW5lIHN0cm9rZT0iIzRENEQ0RCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxOC44NzUiIHkxPSI1Ni4xMzUiIHgyPSI0Ljg3NSIgeTI9IjU2LjEzNSIgZmlsbD0ibm9uZSIvPjxsaW5lIHN0cm9rZT0iIzRENEQ0RCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSI5MS44NzUiIHkxPSI1Ni4xMzUiIHgyPSIxMDQuODc1IiB5Mj0iNTYuMTM1IiBmaWxsPSJub25lIi8+PGxpbmUgc3Ryb2tlPSIjNEQ0RDREIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjU0Ljg3NSIgeTE9IjE5LjEzNSIgeDI9IjU0Ljg3NSIgeTI9IjYuMTM1IiBmaWxsPSJub25lIi8+PGxpbmUgc3Ryb2tlPSIjNEQ0RDREIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjU0Ljg3NSIgeTE9IjkzLjEzNSIgeDI9IjU0Ljg3NSIgeTI9IjEwNi4xMzUiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGZpbGw9IiNmMDAiIHN0cm9rZT0iI2YwMCIgc3Ryb2tlLXdpZHRoPSIuMjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjU1LjEzOCIgY3k9IjU2LjExNyIgcj0iMTcuMzkxIi8+PC9zdmc+');
        if (lego.getCookie('latitude') == undefined || lego.getCookie('longitude') == undefined) {
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
};;lego.search_init = function () {
    var query = lego.getURLParameter('q');
    $('.b-search__q').text(query);
    document.searchf.q.value = query;
    $.getJSON('http://api.openweathermap.org/data/2.5/find?mode=json&type=like&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&q=' + query + '&callback=?')
        .done(function (data) {
            if (data.cod == 200) {
                $('.b-weather__locname_city').text(data.name);
                if (data.count === 0) {
                    lego.search_error();
                } else if (data.count === 1) {
                    document.location.href = '/city/' + data.list[0].id;
                }
                $.each(data.list, function (i, item) {
                    var template = '<div class=\"b-wlist__line\"><div class=\"b-wlist__line__head\"><a class=\"b-wlist__link\" href=\"/city/{itemid}\">{itemname}<a/> <span class\"b-wlist__country\">{itemcountry}</span></div><div class=\"b-wlist__line__content\"><span class=\"b-wlist__temp\">{itemtemp}℃</span> <span class=\"b-wlist__sky\">{itemweather}</span></div></div>';
                    var insert = template.replace('{itemid}', item.id)
                        .replace('{itemname}', item.name)
                        .replace('{itemcountry}', item.sys.country)
                        .replace('{itemtemp}', item.main.temp)
                        .replace('{itemweather}', item.weather[0].main);
                    $(insert).appendTo('.b-wlist');
                });
                $('.b-wcontainer_loading').hide();
            } else {
                console.warn('data error');
                lego.search_error();
            }
        })
        .fail(function (jqxhr, textStatus, error) {
            lego.search_error();
            var err = textStatus + ', ' + error;
            console.log('Request Failed: ' + err);
        });
};

lego.search_error = function () {
    $('<div class=\"b-wlist__error\">Nothing was found. <a class=\"b-wlist__error__link\" href=\"/\">Geolocation?</a></div>').appendTo('.b-wlist');
    $('.b-wlist__error__link').click(function () {
        lego.geoLocation();
    });
};;lego.weather_location = function () {
    var coords = {
        'lat': lego.getCookie('latitude'),
        'lon': lego.getCookie('longitude'),
        'error': lego.getCookie('geoLocationError')
    };
    if (coords.lat === undefined || coords.lon === undefined) {
        lego.geoLocation();

    }
    if (coords.error != 'true') {
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&lat=' + coords.lat + '&lon=' + coords.lon + '&callback=?')
            .done(function (data) {
                if (data.cod == 200) {
                    $('.b-weather__locname_city').text(data.name);
                    $('.b-weather__locname_country').text(' ' + data.sys.country);
                    $('.b-weather-now__data__main_temp').text(data.main.temp + '℃');
                    $('.b-weather-now__data__main_sky_descr').text(' ' + data.weather[0].main);
                    $('.b-weather-now__data__main_sky_fdescr').text(data.weather[0].description);
                    if (350 <= data.wind.deg && data.wind.deg < 10) {
                        $('.b-weather-now__data__wind_val').text('Wind north ' + data.wind.speed + 'm/s');
                    } else if (10 <= data.wind.deg && data.wind.deg < 20) {
                        $('.b-weather-now__data__wind_val').text('Wind north northeast ' + data.wind.speed + 'm/s');
                    } else if (20 <= data.wind.deg && data.wind.deg < 70) {
                        $('.b-weather-now__data__wind_val').text('Wind northeast ' + data.wind.speed + 'm/s');
                    } else if (70 <= data.wind.deg && data.wind.deg < 80) {
                        $('.b-weather-now__data__wind_val').text('Wind east northeast ' + data.wind.speed + 'm/s');
                    } else if (80 <= data.wind.deg && data.wind.deg < 100) {
                        $('.b-weather-now__data__wind_val').text('Wind east ' + data.wind.speed + 'm/s');
                    } else if (110 <= data.wind.deg && data.wind.deg < 160) {
                        $('.b-weather-now__data__wind_val').text('Wind east southeast ' + data.wind.speed + 'm/s');
                    } else if (160 <= data.wind.deg && data.wind.deg < 170) {
                        $('.b-weather-now__data__wind_val').text('Wind southeast ' + data.wind.speed + 'm/s');
                    } else if (170 <= data.wind.deg && data.wind.deg < 190) {
                        $('.b-weather-now__data__wind_val').text('Wind south ' + data.wind.speed + 'm/s');
                    } else if (190 <= data.wind.deg && data.wind.deg < 200) {
                        $('.b-weather-now__data__wind_val').text('Wind south southwest ' + data.wind.speed + 'm/s');
                    } else if (200 <= data.wind.deg && data.wind.deg < 250) {
                        $('.b-weather-now__data__wind_val').text('Wind southwest ' + data.wind.speed + 'm/s');
                    } else if (250 <= data.wind.deg && data.wind.deg < 260) {
                        $('.b-weather-now__data__wind_val').text('Wind west southwest ' + data.wind.speed + 'm/s');
                    } else if (260 <= data.wind.deg && data.wind.deg < 280) {
                        $('.b-weather-now__data__wind_val').text('Wind west ' + data.wind.speed + 'm/s');
                    } else if (280 <= data.wind.deg && data.wind.deg < 290) {
                        $('.b-weather-now__data__wind_val').text('Wind northwest west ' + data.wind.speed + 'm/s');
                    } else if (290 <= data.wind.deg && data.wind.deg < 340) {
                        $('.b-weather-now__data__wind_val').text('Wind northwest ' + data.wind.speed + 'm/s');
                    } else if (340 <= data.wind.deg && data.wind.deg < 350) {
                        $('.b-weather-now__data__wind_val').text('Wind north northwest ' + data.wind.speed + 'm/s');
                    }
                    $('.b-weather-now__data__pres_val').text('Pressure ' + data.main.pressure + ' hPa');
                    $('.b-weather-now__data__hum_val').text('Humidity ' + data.main.humidity + '%');
                    $('.b-wcontainer_loading').hide();
                    console.log('weather data was loaded');
                    google.maps.event.addDomListener(window, 'load', function () {
                        var a = {zoom: 13, center: new google.maps.LatLng(coords.lat, coords.lon), disableDefaultUI: !0, mapTypeId: google.maps.MapTypeId.TERRAIN};
                        new google.maps.Map(document.getElementById('b-map'), a)
                    });
                } else {
                    console.warn('data error');
                    lego.weather_error(1);
                }
            })
            .fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                console.log('Request Failed: ' + err);
            });

        // Getting forecast
        $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&cnt=10&lat=' + coords.lat + '&lon=' + coords.lon + '&callback=?')
            .done(function (data) {
                if (data.cod == 200) {
                    $.each(data.list, function (i, item) {
                        var dt = new Date(item.dt * 1000);
                        var date = {
                            day: dt.getDay(),
                            month: dt.getMonth() + 1,
                            monthtxt: ''
                        };
                        switch (date.month) {
                            case 1:
                                date.monthtxt = 'January';
                                break;
                            case 2:
                                date.monthtxt = 'February';
                                break;
                            case 3:
                                date.monthtxt = 'March';
                                break;
                            case 4:
                                date.monthtxt = 'April';
                                break;
                            case 5:
                                date.monthtxt = 'May';
                                break;
                            case 6:
                                date.monthtxt = 'June';
                                break;
                            case 7:
                                date.monthtxt = 'July';
                                break;
                            case 8:
                                date.monthtxt = 'August';
                                break;
                            case 9:
                                date.monthtxt = 'September';
                                break;
                            case 10:
                                date.monthtxt = 'October';
                                break;
                            case 11:
                                date.monthtxt = 'November';
                                break;
                            case 12:
                                date.monthtxt = 'December';
                                break;
                            default:
                                date.monthtxt = '<!-- Error -->';
                        }
                        var template =
                                '<div class=\"b-weather-forecast__line\">' +
                                    '<div class=\"b-weather-forecast__section b-weather-forecast__section_date\">{date}</div>' +
                                    '<div class=\"b-weather-forecast__section b-weather-forecast__section_content\">' +
                                        '<div class=\"b-weather-forecast__section__item b-weather-forecast__temp\">{temp}</div>' +
                                    '</div>' +
                                '</div>'
                            ;

                        var insert = template.replace('{date}', date.day + ' <span class="b-weather-forecast__section__date">' + date.monthtxt + '</span>')
                            .replace('{temp}', item.temp.max);

                        $(insert).appendTo('.b-weather-forecast');
                    });
                }
            })
            .fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                console.log('Request #2 Failed: ' + err);
            });

    } else {
        lego.weather_error(0);
        console.warn('Geolocation error');
    }
    //tabs
    $('.b-weather-select__item_now').click(function () {
        $(this).addClass('b-weather-select__item_active');
        $('.b-weather-select__item_forecast').removeClass('b-weather-select__item_active');
        $('.b-weather-now').addClass('b-weather_active');
        $('.b-weather-forecast').removeClass('b-weather_active');
    });
    $('.b-weather-select__item_forecast').click(function () {
        $(this).addClass('b-weather-select__item_active');
        $('.b-weather-select__item_now').removeClass('b-weather-select__item_active');
        $('.b-weather-forecast').addClass('b-weather_active');
        $('.b-weather-now').removeClass('b-weather_active');
    });
};


lego.weather_city = function () {
    var pathArray = window.location.pathname.split('/'),
        secondLevelLocation = pathArray[2];

    $.getJSON('http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&id=' + secondLevelLocation + '&callback=?')
        .done(function (data) {
            if (data.cod == 200) {
                $('.b-weather__locname_city').text(data.name);
                $('.b-weather__locname_country').text(' ' + data.sys.country);
                $('.b-weather__data__main_temp').text(data.main.temp + '℃');
                $('.b-weather__data__main_sky_descr').text(' ' + data.weather[0].main);
                $('.b-weather__data__main_sky_fdescr').text(data.weather[0].description);
                if (350 <= data.wind.deg && data.wind.deg < 10) {
                    $('.b-weather__data__wind_val').text('Wind north ' + data.wind.speed + 'm/s');
                } else if (10 <= data.wind.deg && data.wind.deg < 20) {
                    $('.b-weather__data__wind_val').text('Wind north northeast ' + data.wind.speed + 'm/s');
                } else if (20 <= data.wind.deg && data.wind.deg < 70) {
                    $('.b-weather__data__wind_val').text('Wind northeast ' + data.wind.speed + 'm/s');
                } else if (70 <= data.wind.deg && data.wind.deg < 80) {
                    $('.b-weather__data__wind_val').text('Wind east northeast ' + data.wind.speed + 'm/s');
                } else if (80 <= data.wind.deg && data.wind.deg < 100) {
                    $('.b-weather__data__wind_val').text('Wind east ' + data.wind.speed + 'm/s');
                } else if (110 <= data.wind.deg && data.wind.deg < 160) {
                    $('.b-weather__data__wind_val').text('Wind east southeast ' + data.wind.speed + 'm/s');
                } else if (160 <= data.wind.deg && data.wind.deg < 170) {
                    $('.b-weather__data__wind_val').text('Wind southeast ' + data.wind.speed + 'm/s');
                } else if (170 <= data.wind.deg && data.wind.deg < 190) {
                    $('.b-weather__data__wind_val').text('Wind south ' + data.wind.speed + 'm/s');
                } else if (190 <= data.wind.deg && data.wind.deg < 200) {
                    $('.b-weather__data__wind_val').text('Wind south southwest ' + data.wind.speed + 'm/s');
                } else if (200 <= data.wind.deg && data.wind.deg < 250) {
                    $('.b-weather__data__wind_val').text('Wind southwest ' + data.wind.speed + 'm/s');
                } else if (250 <= data.wind.deg && data.wind.deg < 260) {
                    $('.b-weather__data__wind_val').text('Wind west southwest ' + data.wind.speed + 'm/s');
                } else if (260 <= data.wind.deg && data.wind.deg < 280) {
                    $('.b-weather__data__wind_val').text('Wind west ' + data.wind.speed + 'm/s');
                } else if (280 <= data.wind.deg && data.wind.deg < 290) {
                    $('.b-weather__data__wind_val').text('Wind northwest west ' + data.wind.speed + 'm/s');
                } else if (290 <= data.wind.deg && data.wind.deg < 340) {
                    $('.b-weather__data__wind_val').text('Wind northwest ' + data.wind.speed + 'm/s');
                } else if (340 <= data.wind.deg && data.wind.deg < 350) {
                    $('.b-weather__data__wind_val').text('Wind north northwest ' + data.wind.speed + 'm/s');
                }
                $('.b-weather__data__pres_val').text('Pressure ' + data.main.pressure + ' hPa');
                $('.b-weather__data__hum_val').text('Humidity ' + data.main.humidity + '%');
                $('.b-wcontainer_loading').hide();
                console.log('weather data was loaded');
                //function mapInit(){var a={zoom:13,center:new google.maps.LatLng(getCookie('latitude'),getCookie('longitude')),disableDefaultUI:!0,mapTypeId:google.maps.MapTypeId.TERRAIN};new google.maps.Map(document.getElementById('b-map'),a)}
                google.maps.event.addDomListener(window, 'load', function () {
                    var a = {zoom: 13, center: new google.maps.LatLng(data.coord.lat, data.coord.lon), disableDefaultUI: !0, mapTypeId: google.maps.MapTypeId.TERRAIN};
                    new google.maps.Map(document.getElementById('b-map'), a)
                });
            } else {
                console.warn('data error');
                lego.weather_error(1);
            }
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log('Request Failed: ' + err);
        });


};

lego.weather_error = function (errorCod) {
    var errorText;
    $('.b-container_weather').hide();
    $('.b-container_error').show();
    if (errorCod == 0) {
        errorText = 'Geolocation error';
    } else if (errorCod == 1) {
        errorText = 'Weather error';
    }
    $('.b-error').append('<p class=\"b-error__descr\">' + errorText + '</p>');
};
