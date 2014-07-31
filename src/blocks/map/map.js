/*
 * Инициализирует карты
 *
 * @param lat
 * @param lon
 * @param zoom
 * @param dom
 *
 */
lego.mapLoad = function (lat, lon, dom) {
//    lego.mapInit(lat, lon, dom);

    google.maps.event.addDomListener(window, 'load', lego.mapInit(lat, lon, dom));
//    console.log(lat + lon + dom);
};


/*
 *
 *
 * @param lat
 * @param lon
 * @param dom
 */
lego.mapInit = function (lat, lon, dom) {
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(lat, lon),
        disableDefaultUI: !0,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    lego.mapInitParams = new google.maps.Map(document.getElementById(dom),
        mapOptions);

//    console.log('at mapinit:' + lat + lon + dom);
};
