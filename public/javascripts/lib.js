var geoLocationError = false;


/**
 *
 * Создаёт cookie со сроком жизни 1 час
 *
 * @param {string} n Имя cookie
 * @param {string} v Значение cookie
 */
function setCookie(n,v){
		var age = new Date( new Date().getTime() + 60*100000 );
		var val = escape(v) + "; expires="+age.toUTCString();
		document.cookie = n + "=" + val;

		console.info("Cookie successfully installed");
	
}




/**
 *
 * Читает значение cookie
 *
 * @param {string} n Имя cookie
 * @return {string} v Значение cookie
 */
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}




/**
 *
 * Определяет местоположение и отдает в geoLocationSuccess()
 *
 * @return {cookie} Определяет местоположение
 *
 */
function geoLocation(){
	if(Modernizr.geolocation) {
		navigator.geolocation.getCurrentPosition(/*geoLocationSuccess(position)*/function(position){
			setCookie("latitude", position.coords.latitude);
			setCookie("longitude", position.coords.longitude);
			console.info("Location successfully determined.");
			setCookie("geoLocationError", "false");
			geoLocationError = false;
		}, function(){
			console.warn("During detection location the error occurred.");
			setCookie("geoLocationError", "true");
			geoLocationError = true;
		});
		
	}else{
		console.warn("During detection location the error occurred.");
		setCookie("geoLocationError", "true");
		geoLocationError = true;
		
	}
	
}




/**
 * 
 * Обрабатывает ошибку определения местоположения
 *
 * @return {cookie} Отдает cookie с координатами 55.755344 37.61589
 */
function geoLocationError(){
	console.warn("During detection location the error occurred. Will be set default values​​.");
	setCookie("geoLocationError", "true");
	geoLocationError = true;
}




/**
 * Обрабатывает успешное определение местоположения
 *
 * @param position Местоположение
 * @return {cookie} Отдает cookie с определенными координатами
 */
function geoLocationSuccess(position){
	setCookie("latitude", position.coords.latitude);
	setCookie("longitude", position.coords.longitude);

	console.info("Location successfully determined.");
	setCookie("geoLocationError", "false");
	geoLocationError = false;
}