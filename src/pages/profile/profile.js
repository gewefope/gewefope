//window.Zepto || document.write('<script src="/storage/js/vendor/zepto.min.js"><\/script>');
Zepto(function ($) {
//    lego.checkAuth(function () {
//        document.location = '/login';
//    }, function () {
//
//
//    });

    lego.userInfo_init();


    var page = '<div class="b-user__head">\n    <div class="b-user__avatar b-user__avatar_page">\n        <a target="_blank" href="http://www.gravatar.com" title="Change your avatar at Gravatar"><img\n                src="http://www.gravatar.com/avatar/{emailHash}?s=200&d=mm" class="b-user__avatar__img"/></a>\n    </div>\n    <div class="b-user__name b-user__name_page"><span class="b-user__name__displayname">{displayname}</span> <span\n            class="b-user__name__fullname">{fullname}</span></div>\n</div>\n<div class="b-user__profile">\n    <div class="b-user__profile__row">\n        <div class="b-user__profile__item">\n            <span class="b-user__profile__item__title">Email:</span>\n            <span class="b-user__profile__item__content">{email}</span>\n        </div>\n        <div class="b-user__profile__item">\n            <span class="b-user__profile__item__title">Preferred location:</span>\n            <span class="b-user__profile__item__content">{location}</span>\n        </div>\n    </div>\n    <div class="b-user__profile__row">\n        <div class="b-user__profile__item">\n            <span class="b-user__profile__item__title">Preferred location:</span>\n            <span class="b-user__profile__item__content">{location}</span>\n        </div>\n    </div>\n</div> ';
    var html = page.replace('{emailHash}', localStorage.getItem('emailHash'))
        .replace('{displayname}', localStorage.getItem('displayname'))
        .replace('{email}', localStorage.getItem('email'))
        .replace('{location}', localStorage.getItem('location'))
        .replace('{fullname}', ((localStorage.getItem('fullname') === 'null') ? '' : localStorage.getItem('fullname')));

    $('.b-content__placeholder').html(html);

});