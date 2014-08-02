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
    $('.b-button_user').on('click', function () {
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
    $('.b-button_user').on('click', function () {
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