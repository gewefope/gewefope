lego.error = function (errorCode) {
    var errorText;

    $('.b-container-weather_weather').hide();
    $('.b-error').show();

    if (errorCode == '0') {
        errorText = 'Geolocation error';
    } else if (errorCode == '1') {
        errorText = 'Weather error';
    }

    if (errorText !== null) {
        $('.b-error').append('<p class=\"b-error__descr\">' + errorText + '</p>');
    }
};