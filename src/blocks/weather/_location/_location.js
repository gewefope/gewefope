lego.weather_location = function () {
    var coords = {
        lat: lego.getCookie('latitude'),
        lon: lego.getCookie('longitude'),
        error: lego.getCookie('geoLocationError')
    };
    if (coords.lat === undefined || coords.lon === undefined) {
        lego.geoLocation(function (position) {
            lego.setCookie('latitude', position.coords.longitude)
                .setCookie('longitude', position.coords.longitude);
            loadWeatherData();
        });

    } else {
        loadWeatherData();
    }

    function loadWeatherData() {
        if (coords.error != 'true') {
            //$.getJSON('http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&lat=' + coords.lat + '&lon=' + coords.lon + '&callback=?')
//        $.getJSON('/api/weather/coords/' + coords.lat + '/' + coords.lon)
//            .done(function (data) {
//                if (data.cod == 200) {
////                    $('.b-weather__locname_city').text(data.name);
////                    $('.b-weather__locname_country').text(' ' + data.sys.country);
////                    $('.b-weather-now__data__main_temp').text((data.main.temp).toFixed(1) + '℃');
////                    $('.b-weather-now__data__main_sky_descr').text(' ' + data.weather[0].main);
////                    $('.b-weather-now__data__main_sky_fdescr').text(data.weather[0].description);
////                    $('.b-weather-now__data__wind_val').text(lego.windParse(data.wind.deg, data.wind.speed));
////                    $('.b-weather-now__data__pres_val').text('Pressure ' + data.main.pressure + ' hPa');
////                    $('.b-weather-now__data__hum_val').text('Humidity ' + data.main.humidity + '%');
//
//                    var locname_template = '<span class="b-weather__locname_city">{city}</span><span class="b-weather__locname_country">{country}</span>';
//                    var locname_insert = locname_template.replace('{city}', data.name)
//                        .replace('{country}', data.sys.country);
//
//                    var now_template = '<div class="b-weather-now__data">' +
//                        '<div class="b-weather-now__data__main">' +
//                        '<span class="b-weather-now__data__main_temp">{temp}℃</span>' +
//                        '<span class="b-weather-now__data__main_sky">' +
//                        '<span class="b-weather-now__data__main_sky_descr">{sky}</span>' +
//                        '<span class="b-weather-now__data__main_sky_fdescr"> {sky-text}</span>' +
//                        '</span>' +
//                        '</div>' +
//                        '<div class="b-weather-now__data__wind b-weather-now__data_sec">' +
//                        '<span class="b-weather-now__data__wind_val">{wind}</span>' +
//                        '</div>' +
//                        '<div class="b-weather-now__data__pres b-weather-now__data_sec">' +
//                        '<span class="b-weather-now__data__pres_val">Pressure {pressure} hPa</span>' +
//                        '</div>' +
//                        '<div class="b-weather-now__data__hum b-weather-now__data_sec">' +
//                        '<span class="b-weather-now__data__hum_val">Humidity {humidity}%</span>' +
//                        '</div>' +
//                        '</div>';
//
//                    var now_insert = now_template.replace('{temp}', (data.main.temp).toFixed(1))
//                        .replace('{sky}', data.weather[0].main)
//                        .replace('{sky-text}', data.weather[0].description)
//                        .replace('{wind}', lego.windParse(data.wind.deg, data.wind.speed))
//                        .replace('{pressure}', data.main.pressure)
//                        .replace('{humidity}', data.main.humidity);
//
//
//                    $('.b-loader').hide();
//
//                    $(locname_insert).appendTo('.b-weather__locname');
//                    $(now_insert).appendTo('.b-weather-now');
//
////TODO: Разобраться с картой
//
////                    google.maps.event.addDomListener(window, 'load', function () {
////                        var a = {
////                            zoom: 13,
////                            center: new google.maps.LatLng(coords.lat, coords.lon),
////                            disableDefaultUI: !0,
////                            mapTypeId: google.maps.MapTypeId.TERRAIN
////                        };
////                        new google.maps.Map(document.getElementById('b-map'), a);
////                    });
//
////                    lego.loadMap(coords.lat, coords.lon, 13, 'b-map');
//
//                    lego.mapLoad(coords.lat, coords.lon, 'b-map');
//
//                } else {
//                    console.warn('data error');
//                    lego.error(1);
//                }
//            })
//            .fail(function (jqxhr, textStatus, error) {
//                var err = textStatus + ', ' + error;
//                console.log('Request Failed: ' + err);
//            });


            $.ajax({
                type: 'GET',
                url: '/api/weather/coords/' + coords.lat + '/' + coords.lon,
                dataType: 'json',
                success: function (data) {
                    if (data.cod == 200) {
                        var locname_template = '<span class="b-weather__locname_city">{city}</span><span class="b-weather__locname_country">{country}</span>';
                        var locname_insert = locname_template.replace('{city}', data.name)
                            .replace('{country}', data.sys.country);

                        var now_template = '<div class="b-weather-now__data">' +
                            '<div class="b-weather-now__data__main">' +
                            '<span class="b-weather-now__data__main_temp">{temp}℃</span>' +
                            '<span class="b-weather-now__data__main_sky">' +
                            '<span class="b-weather-now__data__main_sky_descr">{sky}</span>' +
                            '<span class="b-weather-now__data__main_sky_fdescr"> {sky-text}</span>' +
                            '</span>' +
                            '</div>' +
                            '<div class="b-weather-now__data__wind b-weather-now__data_sec">' +
                            '<span class="b-weather-now__data__wind_val">{wind}</span>' +
                            '</div>' +
                            '<div class="b-weather-now__data__pres b-weather-now__data_sec">' +
                            '<span class="b-weather-now__data__pres_val">Pressure {pressure} hPa</span>' +
                            '</div>' +
                            '<div class="b-weather-now__data__hum b-weather-now__data_sec">' +
                            '<span class="b-weather-now__data__hum_val">Humidity {humidity}%</span>' +
                            '</div>' +
                            '</div>';

                        var now_insert = now_template.replace('{temp}', (data.main.temp).toFixed(1))
                            .replace('{sky}', data.weather[0].main)
                            .replace('{sky-text}', data.weather[0].description)
                            .replace('{wind}', lego.windParse(data.wind.deg, data.wind.speed))
                            .replace('{pressure}', data.main.pressure)
                            .replace('{humidity}', data.main.humidity);


                        $('.b-loader').hide();

                        $(locname_insert).appendTo('.b-weather__locname');
                        $(now_insert).appendTo('.b-weather-now');

                        lego.mapLoad(coords.lat, coords.lon, 'b-map');

                    } else {
//                        console.warn('data error');
                        lego.error({
                            before: function () {
                                $('.b-container-weather_weather').hide();
                                $('.b-loader').hide();
                            },
                            errorText: data.message
                        });
                    }
                },
                error: function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log('Request Failed: ' + err);
                }
            });


            $.ajax({
                type: 'GET',
                url: '/api/forecast/coords/' + coords.lat + '/' + coords.lon,
                dataType: 'json',
                success: function (data) {
                    if (data.cod == 200) {
                        $.each(data.list, function (i, item) {
                            var dt = new Date(item.dt * 1000);
                            var date = {
                                day: dt.getDate(),
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
                                        '<span class="b-weather-forecast__section__item b-weather-forecast__main">{main}</span>' +
                                        '<span class=\"b-weather-forecast__section__item b-weather-forecast__temp\">' +
                                        '<span class="b-weather-forecast__temp_max">↑{temp-max}</span> ' +
                                        '<span class="b-weather-forecast__temp_min">↓{temp-min}</span>' +
                                        '</span>' +
                                        '<span class="b-weather-forecast__section__item b-weather-forecast__wind">{wind}</span>' +
                                        '</div>' +
                                        '</div>'
                                ;


//                        var insert = template.replace('{date}', '<span class="b-weather-forecast__section__day">' + date.day + '</span> <span class="b-weather-forecast__section__date">' + date.monthtxt + '</span>')
                            var insert = template.replace('{date}', '<span class="b-weather-forecast__section__item b-weather-forecast__section__day">' + date.day + '</span>')
                                    .replace('{temp-max}', (item.temp.max).toFixed(1) + '℃')
                                    .replace('{temp-min}', (item.temp.min).toFixed(1) + '℃')
                                    .replace('{main}', item.weather[0].main)
                                    .replace('{wind}', lego.windParse(item.deg, item.speed))
                                ;

                            $(insert).appendTo('.b-weather-forecast');
                        });
                    } else {
//                        console.warn('data error');
                        lego.error({
                            before: function () {
                                $('.b-container-weather_weather').hide();
                                $('.b-loader').hide();
                            },
                            errorText: data.message
                        });
                    }
                },
                error: function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log('Request #2 Failed: ' + err);
                    lego.error({
                        before: function () {
                            $('.b-container-weather_weather').hide();
                            $('.b-loader').hide();
                        },
                        errorCode: '02'
                    });
                }


            });


            // Getting forecast
            //$.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&cnt=10&lat=' + coords.lat + '&lon=' + coords.lon + '&callback=?')
//        $.getJSON('/api/forecast/coords/' + coords.lat + '/' + coords.lon)
//    .done(function (data) {
//                if (data.cod == 200) {
//                    $.each(data.list, function (i, item) {
//                        var dt = new Date(item.dt * 1000);
//                        var date = {
//                            day: dt.getDate(),
//                            month: dt.getMonth() + 1,
//                            monthtxt: ''
//                        };
//
//
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
        } else {
            lego.error({
                before: function () {
                    $('.b-container-weather_weather').hide();
                    $('.b-loader').hide();
                },
                errorCode: '01'
            });
//            console.warn('Geolocation error');
        }
    }


    //tabs

    lego.weather_select();
}
;
