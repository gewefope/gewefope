////TODO: Переработать весь код в этом файле
//
//
//lego.weather_location = function () {
//    var coords = {
//        lat: lego.getCookie('latitude'),
//        lon: lego.getCookie('longitude'),
//        error: lego.getCookie('geoLocationError')
//    };
//    if (coords.lat === undefined || coords.lon === undefined) {
//        lego.geoLocation();
//
//    }
//    if (coords.error != 'true') {
//        $.getJSON('http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&lat=' + coords.lat + '&lon=' + coords.lon + '&callback=?')
//            .done(function (data) {
//                if (data.cod == 200) {
//                    $('.b-weather__locname_city').text(data.name);
//                    $('.b-weather__locname_country').text(' ' + data.sys.country);
//                    $('.b-weather-now__data__main_temp').text((data.main.temp).toFixed(1) + '℃');
//                    $('.b-weather-now__data__main_sky_descr').text(' ' + data.weather[0].main);
//                    $('.b-weather-now__data__main_sky_fdescr').text(data.weather[0].description);
////                    if (350 <= data.wind.deg && data.wind.deg < 10) {
////                        $('.b-weather-now__data__wind_val').text('Wind north ' + data.wind.speed + 'm/s');
////                    } else if (10 <= data.wind.deg && data.wind.deg < 20) {
////                        $('.b-weather-now__data__wind_val').text('Wind north northeast ' + data.wind.speed + 'm/s');
////                    } else if (20 <= data.wind.deg && data.wind.deg < 70) {
////                        $('.b-weather-now__data__wind_val').text('Wind northeast ' + data.wind.speed + 'm/s');
////                    } else if (70 <= data.wind.deg && data.wind.deg < 80) {
////                        $('.b-weather-now__data__wind_val').text('Wind east northeast ' + data.wind.speed + 'm/s');
////                    } else if (80 <= data.wind.deg && data.wind.deg < 100) {
////                        $('.b-weather-now__data__wind_val').text('Wind east ' + data.wind.speed + 'm/s');
////                    } else if (110 <= data.wind.deg && data.wind.deg < 160) {
////                        $('.b-weather-now__data__wind_val').text('Wind east southeast ' + data.wind.speed + 'm/s');
////                    } else if (160 <= data.wind.deg && data.wind.deg < 170) {
////                        $('.b-weather-now__data__wind_val').text('Wind southeast ' + data.wind.speed + 'm/s');
////                    } else if (170 <= data.wind.deg && data.wind.deg < 190) {
////                        $('.b-weather-now__data__wind_val').text('Wind south ' + data.wind.speed + 'm/s');
////                    } else if (190 <= data.wind.deg && data.wind.deg < 200) {
////                        $('.b-weather-now__data__wind_val').text('Wind south southwest ' + data.wind.speed + 'm/s');
////                    } else if (200 <= data.wind.deg && data.wind.deg < 250) {
////                        $('.b-weather-now__data__wind_val').text('Wind southwest ' + data.wind.speed + 'm/s');
////                    } else if (250 <= data.wind.deg && data.wind.deg < 260) {
////                        $('.b-weather-now__data__wind_val').text('Wind west southwest ' + data.wind.speed + 'm/s');
////                    } else if (260 <= data.wind.deg && data.wind.deg < 280) {
////                        $('.b-weather-now__data__wind_val').text('Wind west ' + data.wind.speed + 'm/s');
////                    } else if (280 <= data.wind.deg && data.wind.deg < 290) {
////                        $('.b-weather-now__data__wind_val').text('Wind northwest west ' + data.wind.speed + 'm/s');
////                    } else if (290 <= data.wind.deg && data.wind.deg < 340) {
////                        $('.b-weather-now__data__wind_val').text('Wind northwest ' + data.wind.speed + 'm/s');
////                    } else if (340 <= data.wind.deg && data.wind.deg < 350) {
////                        $('.b-weather-now__data__wind_val').text('Wind north northwest ' + data.wind.speed + 'm/s');
////                    }
//                    $('.b-weather-now__data__wind_val').text(lego.windParse(data.wind.deg, data.wind.speed));
//                    $('.b-weather-now__data__pres_val').text('Pressure ' + data.main.pressure + ' hPa');
//                    $('.b-weather-now__data__hum_val').text('Humidity ' + data.main.humidity + '%');
//                    $('.b-loader').hide();
//
////TODO: Разобраться с картой
//
//                    google.maps.event.addDomListener(window, 'load', function () {
//                        var a = {
//                            zoom: 13,
//                            center: new google.maps.LatLng(coords.lat, coords.lon),
//                            disableDefaultUI: !0,
//                            mapTypeId: google.maps.MapTypeId.TERRAIN
//                        };
//                        new google.maps.Map(document.getElementById('b-map'), a);
//                    });
//
////                    lego.loadMap(coords.lat, coords.lon, 13, 'b-map');
//
//
//                } else {
//                    console.warn('data error');
//                    lego.weather_error(1);
//                }
//            })
//            .fail(function (jqxhr, textStatus, error) {
//                var err = textStatus + ', ' + error;
//                console.log('Request Failed: ' + err);
//            });
//
//        // Getting forecast
//        $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&cnt=10&lat=' + coords.lat + '&lon=' + coords.lon + '&callback=?')
//            .done(function (data) {
//                if (data.cod == 200) {
//                    $.each(data.list, function (i, item) {
//                        var dt = new Date(item.dt * 1000);
//                        var date = {
//                            day: dt.getDate(),
//                            month: dt.getMonth() + 1,
//                            monthtxt: ''
//
//                        };
//                        switch (date.month) {
//                            case 1:
//                                date.monthtxt = 'January';
//                                break;
//                            case 2:
//                                date.monthtxt = 'February';
//                                break;
//                            case 3:
//                                date.monthtxt = 'March';
//                                break;
//                            case 4:
//                                date.monthtxt = 'April';
//                                break;
//                            case 5:
//                                date.monthtxt = 'May';
//                                break;
//                            case 6:
//                                date.monthtxt = 'June';
//                                break;
//                            case 7:
//                                date.monthtxt = 'July';
//                                break;
//                            case 8:
//                                date.monthtxt = 'August';
//                                break;
//                            case 9:
//                                date.monthtxt = 'September';
//                                break;
//                            case 10:
//                                date.monthtxt = 'October';
//                                break;
//                            case 11:
//                                date.monthtxt = 'November';
//                                break;
//                            case 12:
//                                date.monthtxt = 'December';
//                                break;
//                            default:
//                                date.monthtxt = '<!-- Error -->';
//                        }
//                        var template =
//                                '<div class=\"b-weather-forecast__line\">' +
//                                    '<div class=\"b-weather-forecast__section b-weather-forecast__section_date\">{date}</div>' +
//                                    '<div class=\"b-weather-forecast__section b-weather-forecast__section_content\">' +
//                                    '<span class="b-weather-forecast__section__item b-weather-forecast__main">{main}</span>' +
//                                    '<span class=\"b-weather-forecast__section__item b-weather-forecast__temp\">' +
//                                    '<span class="b-weather-forecast__temp_max">↑{temp-max}</span> ' +
//                                    '<span class="b-weather-forecast__temp_min">↓{temp-min}</span>' +
//                                    '</span>' +
//                                    '<span class="b-weather-forecast__section__item b-weather-forecast__wind">{wind}</span>' +
//                                    '</div>' +
//                                    '</div>'
//                            ;
//
//
////                        var insert = template.replace('{date}', '<span class="b-weather-forecast__section__day">' + date.day + '</span> <span class="b-weather-forecast__section__date">' + date.monthtxt + '</span>')
//                        var insert = template.replace('{date}', '<span class="b-weather-forecast__section__item b-weather-forecast__section__day">' + date.day + '</span>')
//                                .replace('{temp-max}', (item.temp.max).toFixed(1) + '℃')
//                                .replace('{temp-min}', (item.temp.min).toFixed(1) + '℃')
//                                .replace('{main}', item.weather[0].main)
//                                .replace('{wind}', lego.windParse(item.deg, item.speed))
//                            ;
//
//                        $(insert).appendTo('.b-weather-forecast');
//                    });
//                }
//            })
//            .fail(function (jqxhr, textStatus, error) {
//                var err = textStatus + ', ' + error;
//                console.log('Request #2 Failed: ' + err);
//            });
//
//    } else {
//        lego.weather_error(0);
//        console.warn('Geolocation error');
//    }
//
//
//    //tabs
//
//    lego.weather_tabs();
//
////    // проверка хэша и открытие соответсвующей вкладки
////    if(window.location.hash == '#forecast'){
////        $('.b-weather-select__item_forecast').addClass('b-weather-select__item_active');
////        $('.b-weather-select__item_now').removeClass('b-weather-select__item_active');
////        $('.b-weather-forecast').addClass('b-weather_active');
////        $('.b-weather-now').removeClass('b-weather_active');
////        $('.b-footer').addClass('b-footer_st');
////    }
////
////    // Основная логика вкладок
////    $('.b-weather-select__item_now').click(function () {
////        $(this).addClass('b-weather-select__item_active');
////        $('.b-weather-select__item_forecast').removeClass('b-weather-select__item_active');
////        $('.b-weather-now').addClass('b-weather_active');
////        $('.b-weather-forecast').removeClass('b-weather_active');
////        $('.b-footer').removeClass('b-footer_st');
////    });
////    $('.b-weather-select__item_forecast').click(function () {
////        $(this).addClass('b-weather-select__item_active');
////        $('.b-weather-select__item_now').removeClass('b-weather-select__item_active');
////        $('.b-weather-forecast').addClass('b-weather_active');
////        $('.b-weather-now').removeClass('b-weather_active');
////        $('.b-footer').addClass('b-footer_st');
////    });
//};
//
//
//lego.weather_city = function () {
//    var pathArray = window.location.pathname.split('/'),
//        secondLevelLocation = pathArray[2];
//
//
//    $.getJSON('http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&id=' + secondLevelLocation + '&callback=?')
//        .done(function (data) {
//            if (data.cod == 200) {
////                $('.b-weather__locname_city').text(data.name);
////                $('.b-weather__locname_country').text(' ' + data.sys.country);
////                $('.b-weather__data__main_temp').text(data.main.temp + '℃');
////                $('.b-weather__data__main_sky_descr').text(' ' + data.weather[0].main);
////                $('.b-weather__data__main_sky_fdescr').text(data.weather[0].description);
////                if (350 <= data.wind.deg && data.wind.deg < 10) {
////                    $('.b-weather__data__wind_val').text('Wind north ' + data.wind.speed + 'm/s');
////                } else if (10 <= data.wind.deg && data.wind.deg < 20) {
////                    $('.b-weather__data__wind_val').text('Wind north northeast ' + data.wind.speed + 'm/s');
////                } else if (20 <= data.wind.deg && data.wind.deg < 70) {
////                    $('.b-weather__data__wind_val').text('Wind northeast ' + data.wind.speed + 'm/s');
////                } else if (70 <= data.wind.deg && data.wind.deg < 80) {
////                    $('.b-weather__data__wind_val').text('Wind east northeast ' + data.wind.speed + 'm/s');
////                } else if (80 <= data.wind.deg && data.wind.deg < 100) {
////                    $('.b-weather__data__wind_val').text('Wind east ' + data.wind.speed + 'm/s');
////                } else if (110 <= data.wind.deg && data.wind.deg < 160) {
////                    $('.b-weather__data__wind_val').text('Wind east southeast ' + data.wind.speed + 'm/s');
////                } else if (160 <= data.wind.deg && data.wind.deg < 170) {
////                    $('.b-weather__data__wind_val').text('Wind southeast ' + data.wind.speed + 'm/s');
////                } else if (170 <= data.wind.deg && data.wind.deg < 190) {
////                    $('.b-weather__data__wind_val').text('Wind south ' + data.wind.speed + 'm/s');
////                } else if (190 <= data.wind.deg && data.wind.deg < 200) {
////                    $('.b-weather__data__wind_val').text('Wind south southwest ' + data.wind.speed + 'm/s');
////                } else if (200 <= data.wind.deg && data.wind.deg < 250) {
////                    $('.b-weather__data__wind_val').text('Wind southwest ' + data.wind.speed + 'm/s');
////                } else if (250 <= data.wind.deg && data.wind.deg < 260) {
////                    $('.b-weather__data__wind_val').text('Wind west southwest ' + data.wind.speed + 'm/s');
////                } else if (260 <= data.wind.deg && data.wind.deg < 280) {
////                    $('.b-weather__data__wind_val').text('Wind west ' + data.wind.speed + 'm/s');
////                } else if (280 <= data.wind.deg && data.wind.deg < 290) {
////                    $('.b-weather__data__wind_val').text('Wind northwest west ' + data.wind.speed + 'm/s');
////                } else if (290 <= data.wind.deg && data.wind.deg < 340) {
////                    $('.b-weather__data__wind_val').text('Wind northwest ' + data.wind.speed + 'm/s');
////                } else if (340 <= data.wind.deg && data.wind.deg < 350) {
////                    $('.b-weather__data__wind_val').text('Wind north northwest ' + data.wind.speed + 'm/s');
////                }
////                $('.b-weather__data__pres_val').text('Pressure ' + data.main.pressure + ' hPa');
////                $('.b-weather__data__hum_val').text('Humidity ' + data.main.humidity + '%');
////                $('.b-loader').hide();
////
////                //function mapInit(){var a={zoom:13,center:new google.maps.LatLng(getCookie('latitude'),getCookie('longitude')),disableDefaultUI:!0,mapTypeId:google.maps.MapTypeId.TERRAIN};new google.maps.Map(document.getElementById('b-map'),a)}
////                google.maps.event.addDomListener(window, 'load', function () {
////                    var a = {zoom: 13, center: new google.maps.LatLng(data.coord.lat, data.coord.lon), disableDefaultUI: !0, mapTypeId: google.maps.MapTypeId.TERRAIN};
////                    new google.maps.Map(document.getElementById('b-map'), a)
////                });
//
//                $('.b-weather__locname_city').text(data.name);
//                $('.b-weather__locname_country').text(' ' + data.sys.country);
//                $('.b-weather-now__data__main_temp').text((data.main.temp).toFixed(1) + '℃');
//                $('.b-weather-now__data__main_sky_descr').text(' ' + data.weather[0].main);
//                $('.b-weather-now__data__main_sky_fdescr').text(data.weather[0].description);
////                    if (350 <= data.wind.deg && data.wind.deg < 10) {
////                        $('.b-weather-now__data__wind_val').text('Wind north ' + data.wind.speed + 'm/s');
////                    } else if (10 <= data.wind.deg && data.wind.deg < 20) {
////                        $('.b-weather-now__data__wind_val').text('Wind north northeast ' + data.wind.speed + 'm/s');
////                    } else if (20 <= data.wind.deg && data.wind.deg < 70) {
////                        $('.b-weather-now__data__wind_val').text('Wind northeast ' + data.wind.speed + 'm/s');
////                    } else if (70 <= data.wind.deg && data.wind.deg < 80) {
////                        $('.b-weather-now__data__wind_val').text('Wind east northeast ' + data.wind.speed + 'm/s');
////                    } else if (80 <= data.wind.deg && data.wind.deg < 100) {
////                        $('.b-weather-now__data__wind_val').text('Wind east ' + data.wind.speed + 'm/s');
////                    } else if (110 <= data.wind.deg && data.wind.deg < 160) {
////                        $('.b-weather-now__data__wind_val').text('Wind east southeast ' + data.wind.speed + 'm/s');
////                    } else if (160 <= data.wind.deg && data.wind.deg < 170) {
////                        $('.b-weather-now__data__wind_val').text('Wind southeast ' + data.wind.speed + 'm/s');
////                    } else if (170 <= data.wind.deg && data.wind.deg < 190) {
////                        $('.b-weather-now__data__wind_val').text('Wind south ' + data.wind.speed + 'm/s');
////                    } else if (190 <= data.wind.deg && data.wind.deg < 200) {
////                        $('.b-weather-now__data__wind_val').text('Wind south southwest ' + data.wind.speed + 'm/s');
////                    } else if (200 <= data.wind.deg && data.wind.deg < 250) {
////                        $('.b-weather-now__data__wind_val').text('Wind southwest ' + data.wind.speed + 'm/s');
////                    } else if (250 <= data.wind.deg && data.wind.deg < 260) {
////                        $('.b-weather-now__data__wind_val').text('Wind west southwest ' + data.wind.speed + 'm/s');
////                    } else if (260 <= data.wind.deg && data.wind.deg < 280) {
////                        $('.b-weather-now__data__wind_val').text('Wind west ' + data.wind.speed + 'm/s');
////                    } else if (280 <= data.wind.deg && data.wind.deg < 290) {
////                        $('.b-weather-now__data__wind_val').text('Wind northwest west ' + data.wind.speed + 'm/s');
////                    } else if (290 <= data.wind.deg && data.wind.deg < 340) {
////                        $('.b-weather-now__data__wind_val').text('Wind northwest ' + data.wind.speed + 'm/s');
////                    } else if (340 <= data.wind.deg && data.wind.deg < 350) {
////                        $('.b-weather-now__data__wind_val').text('Wind north northwest ' + data.wind.speed + 'm/s');
////                    }
//                $('.b-weather-now__data__wind_val').text(lego.windParse(data.wind.deg, data.wind.speed));
//                $('.b-weather-now__data__pres_val').text('Pressure ' + data.main.pressure + ' hPa');
//                $('.b-weather-now__data__hum_val').text('Humidity ' + data.main.humidity + '%');
//                $('.b-loader').hide();
//
////TODO: Разобраться с картой
//
//                google.maps.event.addDomListener(window, 'load', function () {
//                    var a = {
//                        zoom: 13,
//                        center: new google.maps.LatLng(coords.lat, coords.lon),
//                        disableDefaultUI: !0,
//                        mapTypeId: google.maps.MapTypeId.TERRAIN
//                    };
//                    new google.maps.Map(document.getElementById('b-map'), a);
//                });
//
//            } else {
//                console.warn('data error');
//                lego.weather_error(1);
//            }
//        })
//        .fail(function (jqxhr, textStatus, error) {
//            var err = textStatus + ', ' + error;
//            console.log('Request Failed: ' + err);
//        });
//
//
//    $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&cnt=10&id=' + secondLevelLocation + '&callback=?')
//        .done(function (data) {
//            if (data.cod == 200) {
//                $.each(data.list, function (i, item) {
//                    var dt = new Date(item.dt * 1000);
//                    var date = {
//                        day: dt.getDate(),
//                        month: dt.getMonth() + 1,
//                        monthtxt: ''
//
//                    };
//                    switch (date.month) {
//                        case 1:
//                            date.monthtxt = 'January';
//                            break;
//                        case 2:
//                            date.monthtxt = 'February';
//                            break;
//                        case 3:
//                            date.monthtxt = 'March';
//                            break;
//                        case 4:
//                            date.monthtxt = 'April';
//                            break;
//                        case 5:
//                            date.monthtxt = 'May';
//                            break;
//                        case 6:
//                            date.monthtxt = 'June';
//                            break;
//                        case 7:
//                            date.monthtxt = 'July';
//                            break;
//                        case 8:
//                            date.monthtxt = 'August';
//                            break;
//                        case 9:
//                            date.monthtxt = 'September';
//                            break;
//                        case 10:
//                            date.monthtxt = 'October';
//                            break;
//                        case 11:
//                            date.monthtxt = 'November';
//                            break;
//                        case 12:
//                            date.monthtxt = 'December';
//                            break;
//                        default:
//                            date.monthtxt = '<!-- Error -->';
//                    }
////                        var template =
////                                '<div class=\"b-weather-forecast__line\">' +
////                                    '<div class=\"b-weather-forecast__section b-weather-forecast__section_date\">{date}</div>' +
////                                    '<div class=\"b-weather-forecast__section b-weather-forecast__section_content\">' +
////                                    '<div class=\"b-weather-forecast__section__item b-weather-forecast__temp\">' +
////                                    '<span class="b-weather-forecast__temp_max">↑{temp-max}</span> ' +
////                                    '<span class="b-weather-forecast__temp_min">↓{temp-min}</span>' +
////                                    '</div>' +
////                                    '</div>' +
////                                    '</div>'
////                            ;
////
//////                        var insert = template.replace('{date}', '<span class="b-weather-forecast__section__day">' + date.day + '</span> <span class="b-weather-forecast__section__date">' + date.monthtxt + '</span>')
////                        var insert = template.replace('{date}', '<span class="b-weather-forecast__section__day">' + date.day + '</span>')
////                                .replace('{temp-max}', (item.temp.max).toFixed(1) + '℃')
////                                .replace('{temp-min}', (item.temp.min).toFixed(1) + '℃')
////                            ;
//
//                    var template =
//                            '<div class=\"b-weather-forecast__line\">' +
//                                '<div class=\"b-weather-forecast__section b-weather-forecast__section_date\">{date}</div>' +
//                                '<div class=\"b-weather-forecast__section b-weather-forecast__section_content\">' +
//                                '<span class="b-weather-forecast__section__item b-weather-forecast__main">{main}</span>' +
//                                '<span class=\"b-weather-forecast__section__item b-weather-forecast__temp\">' +
//                                '<span class="b-weather-forecast__temp_max">↑{temp-max}</span> ' +
//                                '<span class="b-weather-forecast__temp_min">↓{temp-min}</span>' +
//                                '</span>' +
//                                '<span class="b-weather-forecast__section__item b-weather-forecast__wind">{wind}</span>' +
//                                '</div>' +
//                                '</div>'
//                        ;
//
//
////                        var insert = template.replace('{date}', '<span class="b-weather-forecast__section__day">' + date.day + '</span> <span class="b-weather-forecast__section__date">' + date.monthtxt + '</span>')
//                    var insert = template.replace('{date}', '<span class="b-weather-forecast__section__item b-weather-forecast__section__day">' + date.day + '</span>')
//                            .replace('{temp-max}', (item.temp.max).toFixed(1) + '℃')
//                            .replace('{temp-min}', (item.temp.min).toFixed(1) + '℃')
//                            .replace('{main}', item.weather[0].main)
//                            .replace('{wind}', lego.windParse(item.deg, item.speed))
//                        ;
//
//                    $(insert).appendTo('.b-weather-forecast');
//                });
//            }
//        })
//        .fail(function (jqxhr, textStatus, error) {
//            var err = textStatus + ', ' + error;
//            console.log('Request #2 Failed: ' + err);
//        });
//
//
//    lego.weather_tabs();
//
//};
//
//
//lego.weather_tabs = function () {
//    // проверка хэша и открытие соответсвующей вкладки
//    if (window.location.hash == '#forecast') {
//        $('.b-weather-select__item_forecast').addClass('b-weather-select__item_active');
//        $('.b-weather-select__item_now').removeClass('b-weather-select__item_active');
//        $('.b-weather-forecast').addClass('b-weather_active');
//        $('.b-weather-now').removeClass('b-weather_active');
//        $('.b-footer').addClass('b-footer_st');
//    }
//
//    // Основная логика вкладок
//    $('.b-weather-select__item_now').click(function () {
//        $(this).addClass('b-weather-select__item_active');
//        $('.b-weather-select__item_forecast').removeClass('b-weather-select__item_active');
//        $('.b-weather-now').addClass('b-weather_active');
//        $('.b-weather-forecast').removeClass('b-weather_active');
//        $('.b-footer').removeClass('b-footer_st');
//    });
//    $('.b-weather-select__item_forecast').click(function () {
//        $(this).addClass('b-weather-select__item_active');
//        $('.b-weather-select__item_now').removeClass('b-weather-select__item_active');
//        $('.b-weather-forecast').addClass('b-weather_active');
//        $('.b-weather-now').removeClass('b-weather_active');
//        $('.b-footer').addClass('b-footer_st');
//    });
//};
//
//
//lego.weather_error = function (errorCod) {
//    var errorText;
//
//    $('.b-container-weather_weather').hide();
//    $('.b-error').show();
//
//    if (errorCod == '0') {
//        errorText = 'Geolocation error';
//    } else if (errorCod == '1') {
//        errorText = 'Weather error';
//    }
//
//    if (errorText !== null) {
//        $('.b-error').append('<p class=\"b-error__descr\">' + errorText + '</p>');
//    }
//
//};
//

/*
 *
 * @param deg
 * @param speed
 * @return text
 */
lego.windParse = function (deg, speed) {
    if (350 <= deg && deg < 10) {
        //$('.b-weather-now__data__wind_val').text('Wind north ' + speed + 'm/s');
        return 'Wind north ' + speed + 'm/s';
    } else if (10 <= deg && deg < 20) {
//        $('.b-weather-now__data__wind_val').text('Wind north northeast ' + speed + 'm/s');
        return 'Wind north northeast ' + speed + 'm/s';
    } else if (20 <= deg && deg < 70) {
//        $('.b-weather-now__data__wind_val').text('Wind northeast ' + speed + 'm/s');
        return 'Wind northeast ' + speed + 'm/s';
    } else if (70 <= deg && deg < 80) {
//        $('.b-weather-now__data__wind_val').text('Wind east northeast ' + speed + 'm/s');
        return 'Wind east northeast ' + speed + 'm/s';
    } else if (80 <= deg && deg < 100) {

//        $('.b-weather-now__data__wind_val').text('Wind east ' + speed + 'm/s');
        return 'Wind east ' + speed + 'm/s';
    } else if (110 <= deg && deg < 160) {
//        $('.b-weather-now__data__wind_val').text('Wind east southeast ' + speed + 'm/s');
        return 'Wind east southeast ' + speed + 'm/s';
    } else if (160 <= deg && deg < 170) {
//        $('.b-weather-now__data__wind_val').text('Wind southeast ' + speed + 'm/s');
        return 'Wind southeast ' + speed + 'm/s';
    } else if (170 <= deg && deg < 190) {
//        $('.b-weather-now__data__wind_val').text('Wind south ' + speed + 'm/s');
        return 'Wind south ' + speed + 'm/s';
    } else if (190 <= deg && deg < 200) {
//        $('.b-weather-now__data__wind_val').text('Wind south southwest ' + speed + 'm/s');
        return 'Wind south southwest ' + speed + 'm/s';
    } else if (200 <= deg && deg < 250) {
//        $('.b-weather-now__data__wind_val').text('Wind southwest ' + speed + 'm/s');
        return 'Wind southwest ' + speed + 'm/s';
    } else if (250 <= deg && deg < 260) {
//        $('.b-weather-now__data__wind_val').text('Wind west southwest ' + speed + 'm/s');
        return 'Wind west southwest ' + speed + 'm/s';
    } else if (260 <= deg && deg < 280) {
//        $('.b-weather-now__data__wind_val').text('Wind west ' + speed + 'm/s');
        return 'Wind west ' + speed + 'm/s';
    } else if (280 <= deg && deg < 290) {
//        $('.b-weather-now__data__wind_val').text('Wind northwest west ' + speed + 'm/s');
        return 'Wind northwest west ' + speed + 'm/s';
    } else if (290 <= deg && deg < 340) {
//        $('.b-weather-now__data__wind_val').text('Wind northwest ' + speed + 'm/s');
        return 'Wind northwest ' + speed + 'm/s';
    } else if (340 <= deg && deg < 350) {
//        $('.b-weather-now__data__wind_val').text('Wind north northwest ' + speed + 'm/s');
        return 'Wind north northwest ' + speed + 'm/s';
    } else {
        console.warn('windParse error');
        return '';
    }
};