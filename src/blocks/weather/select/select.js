lego.weather_select = function () {
    // проверка хэша и открытие соответсвующей вкладки
    if (window.location.hash == '#forecast') {
        $('.b-weather-select__item_forecast').addClass('b-weather-select__item_active');
        $('.b-weather-select__item_now').removeClass('b-weather-select__item_active');
        $('.b-weather-forecast').addClass('b-weather_active');
        $('.b-weather-now').removeClass('b-weather_active');
        $('.b-footer').addClass('b-footer_st');
    }

    // Основная логика вкладок
    $('.b-weather-select__item_now').click(function () {
        $(this).addClass('b-weather-select__item_active');
        $('.b-weather-select__item_forecast').removeClass('b-weather-select__item_active');
        $('.b-weather-now').addClass('b-weather_active');
        $('.b-weather-forecast').removeClass('b-weather_active');
        $('.b-footer').removeClass('b-footer_st');
    });
    $('.b-weather-select__item_forecast').click(function () {
        $(this).addClass('b-weather-select__item_active');
        $('.b-weather-select__item_now').removeClass('b-weather-select__item_active');
        $('.b-weather-forecast').addClass('b-weather_active');
        $('.b-weather-now').removeClass('b-weather_active');
        $('.b-footer').addClass('b-footer_st');
    });
};