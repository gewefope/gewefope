//!(!window.Zepto && !document.write('<script src="/storage/js/vendor/zepto.min.js"><\/script>'));

Zepto(function ($) {
//    lego.checkAuth(function () {
//
//
//
//
//
//    }, function () {
//        document.location = '/home';
//    });

    $('.b-button_user').on('click', function () {
        $('.b-form__error').removeClass('b-form__error_visible');
        var userData = {
            email: $('.b-form__input_email').val(),
            password: $('.b-form__input_password').val(),
            fullname: $('.b-form__input_fullname').val()
        };
        if (userData.email === '' || userData.password === '') {
            $('.b-form__error').addClass('b-form__error_visible').html('<span class="b-form__error__descr">Invalid email or password</span>');
        } else {

            $.ajax({
                type: 'POST',
                url: '/api/v1/user/signup?ZW1haWw=' + encodeURIComponent(window.btoa(userData.email)) + '&cGFzc3dvcmQ=' + encodeURIComponent(window.btoa(userData.password)) + '&ZnVsbG5hbWU=' + encodeURIComponent(window.btoa(userData.fullname)),
                dataType: 'json',
                success: function (data) {
                    /*jshint unused:true, eqnull:true */
                    if (data.error != null || data.error != undefined) {
                        $('.b-form__error').addClass('b-form__error_visible').html('<span class="b-form__error__descr">Invalid email or password</span>');

                    } else {
                        lego.setCookie('sid', data.sessionToken);
                        localStorage.emailHash = lego.md5(data.username);
                        localStorage.email = data.username;
                        localStorage.objectId = data.objectId;
                        $.ajax({
                            type: 'GET',
                            url: 'http://www.gravatar.com/' + localStorage.emailHash + '.json?callback=?',
                            dataType: 'jsonp',
                            success: function (Profiledata) {
                                if (Profiledata != '"User not found"') {
                                    localStorage.fullname = Profiledata.entry[0].name.formatted;
                                    localStorage.displayname = Profiledata.entry[0].displayName;
                                    localStorage.location = Profiledata.entry[0].currentLocation;
                                } else {
                                    localStorage.displayname = localStorage.email;
                                }


                                document.location = '/';
                            },
                            error: function () {
                                localStorage.email = data.username;
                                localStorage.displayname = localStorage.email;


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
});