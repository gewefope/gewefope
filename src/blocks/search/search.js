lego.search_init = function () {
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
                $('.b-loader').hide();
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
    $('.b-loader').hide();
};