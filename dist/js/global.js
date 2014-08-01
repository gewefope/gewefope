;
(function ($) {
    $.getScript = function (src, func) {
        var script = document.createElement('script');
        script.async = "async";
        script.src = src;
        if (func) {
            script.onload = func;
        }
        document.getElementsByTagName("head")[0].appendChild(script);
    };
})($);

var lego = {};


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
 * @param {function} success
 * @param {function} error
 */
lego.geoLocation = function (success, error) {

    if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lego.setCookie("latitude", position.coords.latitude);
            lego.setCookie("longitude", position.coords.longitude);
            console.info("Location successfully determined.");
            lego.setCookie("geoLocationError", "false");
            success();
        }, function () {
            console.warn("During detection location the error occurred.");
            lego.setCookie("geoLocationError", "true");
            error();
        });

    } else {
        console.warn("During detection location the error occurred.");
        lego.setCookie("geoLocationError", "true");
        error();
    }


};


/**
 * Считает хэш
 *
 * @param string
 * @returns {string}
 */
lego.md5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function H(x, y, z) {
        return (x ^ y ^ z);
    }

    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9 , S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
};
lego.checkAuth = function (errorCallback, Callback) {
    var sid = lego.getCookie('sid');
    if (sid === null || sid === undefined) {
        errorCallback();
    } else {
        $.ajax({
            type: 'GET',
            url: '/api/v1/user/me?sid=' + sid,
            dataType: 'json',
            success: function (data) {
                if (data.error === 'invalid session') {
                    errorCallback();
                } else {
                    Callback(data);
                }
            },
            error: function (xhr, type) {
                errorCallback();
                console.error(xhr, type);
            }
        })
    }
};

lego.userInfo_init = function () {
//    var userData = {
//        email: localStorage.getItem('email'),
//        displayname: localStorage.getItem('displayname')
//    };
//    if (userData.displayname == null || userData.fullname === 'undefined') {
//        userData.displayname = userData.email;
//    }
    $('<div class="b-user__item b-user__avatar b-user__avatar_small"><img class="b-user__avatar__img" src="http://www.gravatar.com/avatar/' + localStorage.getItem('emailHash') + '?s=30&d=mm"/></div>' +
        '<div class="b-user__item b-user__name">' + localStorage.getItem('displayname') + '</div>' +
        '<div class="b-user__item b-user__profile b-user__profile_header"><a class="b-link b-user__profile__link" href="/profile">Profile</a></div>' +
        '<div class="b-user__item b-user__logout"><a class="b-link b-user__logout__link" href="/logout">Logout</a></div>').appendTo('.b-user');

    $('.b-user__logout__link').on('click', function () {
        lego.setCookie('sid', null);
        localStorage['email'] = null;
        localStorage['objectId'] = null;
        localStorage['fullname'] = null;
        localStorage['displayname'] = null;
        localStorage['location'] = null;
        localStorage['emailHash'] = null;
        document.location = '/';

        return false;
    })
};


lego.userLoginForm = function () {
    $('.b-form__submit').on('click', function () {
        var userData = {
            email: $('.b-form__input_email').val(),
            password: $('.b-form__input_password').val()
        };

        $.ajax({
            type: 'GET',
            url: '/api/v1/user/login?ZW1haWw=' + encodeURIComponent(window.btoa(userData.email)) + '&cGFzc3dvcmQ=' + encodeURIComponent(window.btoa(userData.password)),
            dataType: 'json',
            success: function (data) {
                if (data.error != null || data.error != undefined) {
//                    $('<span class="b-form__error__descr">Invalid username or password</span>').appendTo('.b-form__error');
                    $('.b-form__error').addClass('b-form__error_visible').html('<span class="b-form__error__descr">Invalid email or password</span>');

                } else {
                    lego.setCookie('sid', data.sessionToken);
                    localStorage['emailHash'] = lego.md5(data.username);
                    localStorage['email'] = data.username;
                    localStorage['objectId'] = data.objectId;
                    $.ajax({
                        type: 'GET',
                        url: 'http://www.gravatar.com/' + localStorage['emailHash'] + '.json?callback=?',
                        dataType: 'jsonp',
                        success: function (Profiledata) {
                            if (Profiledata != '"User not found"') {
                                localStorage['fullname'] = Profiledata.entry[0].name.formatted;
                                localStorage['displayname'] = Profiledata.entry[0].displayName;
                                localStorage['location'] = Profiledata.entry[0].currentLocation;
                            } else {
                                localStorage['displayname'] = localStorage['email']
                            }


                            document.location = '/';
                        },
                        error: function () {
                            localStorage['email'] = data.username;
                            localStorage['displayname'] = localStorage['email']


                            document.location = '/';
                        }
                    });
                }
            },
            error: function (xhr, type) {
//                $('<span class="b-form__error__descr">Something is wrong, try again.</span>').appendTo('.b-form__error');
                $('.b-form__error').addClass('b-form__error_visible').html('<span class="b-form__error__descr">Something is wrong, try again.</span>');
            }
        });
        return false;
    });
};


lego.userSignupForm = function () {
    $('.b-form__submit').on('click', function () {
        $('.b-form__error').removeClass('b-form__error_visible');
        var userData = {
            email: $('.b-form__input_email').val(),
            password: $('.b-form__input_password').val(),
            fullname: $('.b-form__input_fullname').val()
        };
        if (userData.email == '' || userData.password == '') {
            $('.b-form__error').addClass('b-form__error_visible').html('<span class="b-form__error__descr">Invalid email or password</span>');
        } else {

            $.ajax({
                type: 'POST',
                url: '/api/v1/user/signup?ZW1haWw=' + encodeURIComponent(window.btoa(userData.email)) + '&cGFzc3dvcmQ=' + encodeURIComponent(window.btoa(userData.password)) + '&ZnVsbG5hbWU=' + encodeURIComponent(window.btoa(userData.fullname)),
                dataType: 'json',
                success: function (data) {
                    if (data.error != null || data.error != undefined) {
//                        if(data.error == 'username 123 already taken'){
//                            $('.b-form__error').addClass('b-form__error_visible').html('<span class="b-form__error__descr">Invalid email or password</span>');
//                        }
//                    $('<span class="b-form__error__descr">Invalid username or password</span>').appendTo('.b-form__error');
                        $('.b-form__error').addClass('b-form__error_visible').html('<span class="b-form__error__descr">Invalid email or password</span>');

                    } else {
                        lego.setCookie('sid', data.sessionToken);
                        localStorage['emailHash'] = lego.md5(data.username);
                        localStorage['email'] = data.username;
                        localStorage['objectId'] = data.objectId;
                        $.ajax({
                            type: 'GET',
                            url: 'http://www.gravatar.com/' + localStorage['emailHash'] + '.json?callback=?',
                            dataType: 'jsonp',
                            success: function (Profiledata) {
                                if (Profiledata != '"User not found"') {
                                    localStorage['fullname'] = Profiledata.entry[0].name.formatted;
                                    localStorage['displayname'] = Profiledata.entry[0].displayName;
                                    localStorage['location'] = Profiledata.entry[0].currentLocation;
                                } else {
                                    localStorage['displayname'] = localStorage['email']
                                }


                                document.location = '/';
                            },
                            error: function () {
                                localStorage['email'] = data.username;
                                localStorage['displayname'] = localStorage['email'];


                                document.location = '/';
                            }
                        });

                    }
                },
                error: function (xhr, type) {
//                $('<span class="b-form__error__descr">Something is wrong, try again.</span>').appendTo('.b-form__error');
                    $('.b-form__error').addClass('b-form__error_visible').html('<span class="b-form__error__descr">Something is wrong, try again.</span>');
                }
            });
        }
        return false;
    });
};


lego.userProfile = function () {

    var page = '<div class="b-user__head">\n    <div class="b-user__avatar b-user__avatar_page">\n        <a target="_blank" href="http://www.gravatar.com" title="Change your avatar at Gravatar"><img\n                src="http://www.gravatar.com/avatar/{emailHash}?s=200&d=mm" class="b-user__avatar__img"/></a>\n    </div>\n    <div class="b-user__name b-user__name_page"><span class="b-user__name__displayname">{displayname}</span> <span\n            class="b-user__name__fullname">{fullname}</span></div>\n</div>\n<div class="b-user__profile">\n    <div class="b-user__profile__row">\n        <div class="b-user__profile__item">\n            <span class="b-user__profile__item__title">Email:</span>\n            <span class="b-user__profile__item__content">{email}</span>\n        </div>\n        <div class="b-user__profile__item">\n            <span class="b-user__profile__item__title">Preferred location:</span>\n            <span class="b-user__profile__item__content">{location}</span>\n        </div>\n    </div>\n    <div class="b-user__profile__row">\n        <div class="b-user__profile__item">\n            <span class="b-user__profile__item__title">Preferred location:</span>\n            <span class="b-user__profile__item__content">{location}</span>\n        </div>\n    </div>\n</div> ';
    var html = page.replace('{emailHash}', localStorage.getItem('emailHash'))
        .replace('{displayname}', localStorage.getItem('displayname'))
        .replace('{email}', localStorage.getItem('email'))
        .replace('{location}', localStorage.getItem('location'))
        .replace('{fullname}', ((localStorage.getItem('fullname') === 'null') ? '' : localStorage.getItem('fullname')));

//    if (localStorage.getItem('fullname') === 'null') {
//        html.replace('{fullname}', '');
//    } else {
//        html.replace('{fullname}', localStorage.getItem('fullname'));
//    }

    $('.b-content__placeholder').html(html);
};
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

lego.chcontainer_init = function () {
    $('.b-chcontainer__item_loc').click(function () {
        $('.b-chcontainer__item__img_geoloc').attr('src', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTAiIGhlaWdodD0iMTEwIj48Y2lyY2xlIHN0cm9rZT0iIzRENEQ0RCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSI1NS4xMzgiIGN5PSI1Ni4xMTciIHI9IjQxLjMwNCIgZmlsbD0ibm9uZSIvPjxsaW5lIHN0cm9rZT0iIzRENEQ0RCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxOC44NzUiIHkxPSI1Ni4xMzUiIHgyPSI0Ljg3NSIgeTI9IjU2LjEzNSIgZmlsbD0ibm9uZSIvPjxsaW5lIHN0cm9rZT0iIzRENEQ0RCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSI5MS44NzUiIHkxPSI1Ni4xMzUiIHgyPSIxMDQuODc1IiB5Mj0iNTYuMTM1IiBmaWxsPSJub25lIi8+PGxpbmUgc3Ryb2tlPSIjNEQ0RDREIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjU0Ljg3NSIgeTE9IjE5LjEzNSIgeDI9IjU0Ljg3NSIgeTI9IjYuMTM1IiBmaWxsPSJub25lIi8+PGxpbmUgc3Ryb2tlPSIjNEQ0RDREIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjU0Ljg3NSIgeTE9IjkzLjEzNSIgeDI9IjU0Ljg3NSIgeTI9IjEwNi4xMzUiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGZpbGw9IiNmMDAiIHN0cm9rZT0iI2YwMCIgc3Ryb2tlLXdpZHRoPSIuMjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjU1LjEzOCIgY3k9IjU2LjExNyIgcj0iMTcuMzkxIi8+PC9zdmc+');
        if (lego.getCookie('latitude') === undefined || lego.getCookie('longitude') === undefined) {
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
            lego.geoLocation(function () {
                    document.location.href = '/location';
                },
                function () {
                    document.location.href = '/location';
                });

//            lego.geoLocation();
//            document.location.href = '/location';
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
};
lego.search_init = function () {
    var query = lego.getURLParameter('q');
    $('.b-search__q').text(query);
    document.searchf.q.value = query;
//    $.getJSON('http://api.openweathermap.org/data/2.5/find?mode=json&type=like&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&q=' + query + '&callback=?')
//        .done(function (data) {
//            if (data.cod == 200) {
//                $('.b-weather__locname_city').text(data.name);
//                if (data.count === 0) {
//                    lego.search_error();
//                } else if (data.count === 1) {
//                    document.location.href = '/city/' + data.list[0].id;
//                }
//                $.each(data.list, function (i, item) {
//                    var template = '<div class=\"b-wlist__line\"><div class=\"b-wlist__line__head\"><a class=\"b-wlist__link\" href=\"/city/{itemid}\">{itemname}<a/> <span class\"b-wlist__country\">{itemcountry}</span></div><div class=\"b-wlist__line__content\"><span class=\"b-wlist__temp\">{itemtemp}℃</span> <span class=\"b-wlist__sky\">{itemweather}</span></div></div>';
//                    var insert = template.replace('{itemid}', item.id)
//                        .replace('{itemname}', item.name)
//                        .replace('{itemcountry}', item.sys.country)
//                        .replace('{itemtemp}', item.main.temp)
//                        .replace('{itemweather}', item.weather[0].main);
//                    $(insert).appendTo('.b-wlist');
//                });
//                $('.b-loader').hide();
//            } else {
//                console.warn('data error');
//                lego.search_error();
//            }
//        })
//        .fail(function (jqxhr, textStatus, error) {
//            lego.search_error();
//            var err = textStatus + ', ' + error;
//            console.log('Request Failed: ' + err);
//        });

    $.ajax({
        type: 'GET',
        url: '/api/search/' + query,
        dataType: 'json',
        success: function(data){
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
                        .replace('{itemtemp}', (item.main.temp).toFixed(1))
                        .replace('{itemweather}', item.weather[0].main);
                    $(insert).appendTo('.b-wlist');
                });
                $('.b-loader').hide();
            } else {
                console.warn('data error');
                lego.search_error();
            }
        },
        error: function(xhr, type){
            lego.search_error();
            var err = xhr + ', ' + type;
            console.log('Request Failed: ' + err);
        }
    });
};

lego.search_error = function () {
    $('<div class=\"b-wlist__error\">Nothing was found. <a class=\"b-wlist__error__link\" href=\"/\">Geolocation?</a></div>').appendTo('.b-wlist');
    $('.b-wlist__error__link').click(function () {
        lego.geoLocation();
    });
    $('.b-loader').hide();
};
////
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
        return '';
    }
};
lego.weather_city = function () {
    var pathArray = window.location.pathname.split('/'),
        secondLevelLocation = pathArray[2];


//    $.getJSON('http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&id=' + secondLevelLocation + '&callback=?')
//    $.getJSON('/api/weather/city/' + secondLevelLocation)
//
//        .done(function (data) {
//            if (data.cod == 200) {
//
//                var locname_template = '<span class="b-weather__locname_city">{city}</span><span class="b-weather__locname_country">{country}</span>';
//
//                var locname_insert = locname_template.replace('{city}', data.name)
//                    .replace('{country}', data.sys.country);
//
//
//                var now_template = '<div class="b-weather-now__data">' +
//                    '<div class="b-weather-now__data__main">' +
//                    '<span class="b-weather-now__data__main_temp">{temp}℃</span>' +
//                    '<span class="b-weather-now__data__main_sky">' +
//                    '<span class="b-weather-now__data__main_sky_descr">{sky}</span>' +
//                    '<span class="b-weather-now__data__main_sky_fdescr"> {sky-text}</span>' +
//                    '</span>' +
//                    '</div>' +
//                    '<div class="b-weather-now__data__wind b-weather-now__data_sec">' +
//                    '<span class="b-weather-now__data__wind_val">{wind}</span>' +
//                    '</div>' +
//                    '<div class="b-weather-now__data__pres b-weather-now__data_sec">' +
//                    '<span class="b-weather-now__data__pres_val">Pressure {pressure} hPa</span>' +
//                    '</div>' +
//                    '<div class="b-weather-now__data__hum b-weather-now__data_sec">' +
//                    '<span class="b-weather-now__data__hum_val">Humidity {humidity}%</span>' +
//                    '</div>' +
//                    '</div>';
//
//                var now_insert = now_template.replace('{temp}', (data.main.temp).toFixed(1))
//                    .replace('{sky}', data.weather[0].main)
//                    .replace('{sky-text}', data.weather[0].description)
//                    .replace('{wind}', lego.windParse(data.wind.deg, data.wind.speed))
//                    .replace('{pressure}', data.main.pressure)
//                    .replace('{humidity}', data.main.humidity);
//
//
//                $('.b-loader').hide();
//
//                $(now_insert).appendTo('.b-weather-now');
//                $(locname_insert).appendTo('.b-weather__locname');
//
//
//                lego.mapLoad(data.coord.lat, data.coord.lon, 'b-map');
//
//            } else {
//                console.warn('data error');
//                lego.error(1);
//            }
//        })
//        .fail(function (jqxhr, textStatus, error) {
//            var err = textStatus + ', ' + error;
//            console.log('Request Failed: ' + err);
//        });


    var locname_insert,
        now_insert,
        forecast_insert;

    $.ajax({
        type: 'GET',
        url: '/api/weather/city/' + secondLevelLocation,
        dataType: 'json',
        success: function (data) {
            if (data.cod == 200) {
                var locname_template = '<span class="b-weather__locname_city">{city}</span><span class="b-weather__locname_country">{country}</span>';

                locname_insert = locname_template.replace('{city}', data.name)
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

                now_insert = now_template.replace('{temp}', (data.main.temp).toFixed(1))
                    .replace('{sky}', data.weather[0].main)
                    .replace('{sky-text}', data.weather[0].description)
                    .replace('{wind}', lego.windParse(data.wind.deg, data.wind.speed))
                    .replace('{pressure}', data.main.pressure)
                    .replace('{humidity}', data.main.humidity);

                $(now_insert).appendTo('.b-weather-now');
                $(locname_insert).appendTo('.b-weather__locname');

                lego.mapLoad(data.coord.lat, data.coord.lon, 'b-map');

            } else {
//                console.warn('data error');
                lego.error({
                    before: function(){
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
            lego.error({
                before: function(){
                    $('.b-container-weather_weather').hide();
                    $('.b-loader').hide();
                },
                errorCode: '02'
            });
        }
    });


    $.ajax({
        type: 'GET',
        url: '/api/forecast/city/' + secondLevelLocation,
        dataType: 'json',
        success: function (data) {
            if (data.cod == 200) {
                $.each(data.list, function (i, item) {
                    var dt = new Date(item.dt * 1000);
                    var date = {
                        day: dt.getDate(),
                        month: dt.getMonth() + 1
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


                    forecast_insert = template.replace('{date}', '<span class="b-weather-forecast__section__item b-weather-forecast__section__day">' + date.day + '</span>')
                        .replace('{temp-max}', (item.temp.max).toFixed(1) + '℃')
                        .replace('{temp-min}', (item.temp.min).toFixed(1) + '℃')
                        .replace('{main}', item.weather[0].main)
                        .replace('{wind}', lego.windParse(item.deg, item.speed))
                    ;

                    $(forecast_insert).appendTo('.b-weather-forecast');
                });
            } else {
//                console.warn('data error');
                lego.error({
                    before: function(){
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
                before: function(){
                    $('.b-container-weather_weather').hide();
                    $('.b-loader').hide();
                },
                errorText: data.message
            });
        }
    });

////    $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&cnt=10&id=' + secondLevelLocation + '&callback=?')
//    $.getJSON('/api/forecast/city/' + secondLevelLocation)
//
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


    $('.b-loader').hide();

//    $(now_insert).appendTo('.b-weather-now');
//    $(locname_insert).appendTo('.b-weather__locname');
//    $(forecast_insert).appendTo('.b-weather-forecast');

    lego.weather_select();

};

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