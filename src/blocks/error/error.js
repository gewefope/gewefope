/*
*
* @param {object} types
 */
lego.error = function (types) {
    if(types.before !== undefined){
        types.before();
    }

    if(types.errorText === undefined){
        if(types.errorCode == '01'){
            types.errorText = 'Geolocation error';
        } else if(types.errorCode == '02'){
            types.errorText = 'Data error';
        }
    }

    $('.b-error').append('<p class=\"b-error__descr\">' + types.errorText + '</p>');


//    $('.b-container-weather_weather').hide();
    $('.b-error').show();

//    if (errorCode == '0') {
//        errorText = 'Geolocation error';
//    } else if (errorCode == '1') {
//        errorText = 'Weather error';
//    }
//
//    if (errorText !== null) {
//        $('.b-error').append('<p class=\"b-error__descr\">' + errorText + '</p>');
//    }
    if(types.after !== undefined){
        types.after();
    }
};