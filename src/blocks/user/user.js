

lego.userInfo_init = function () {
//    var userData = {
//        email: localStorage.getItem('email'),
//        displayname: localStorage.getItem('displayname')
//    };
//    if (userData.displayname == null || userData.fullname === 'undefined') {
//        userData.displayname = userData.email;
//    }
//    $('<div class="b-user__item b-user__avatar b-user__avatar_small"><img class="b-user__avatar__img" src="http://www.gravatar.com/avatar/' + localStorage.getItem('emailHash') + '?s=30&d=mm"/></div>' +
//        '<div class="b-user__item b-user__name">' + localStorage.getItem('displayname') + '</div>' +
//        '<div class="b-user__item b-user__profile b-user__profile_header"><a class="b-link b-user__profile__link" href="/profile">Profile</a></div>' +
//        '<div class="b-user__item b-user__logout"><a class="b-link b-user__logout__link" href="/logout">Logout</a></div>').appendTo('.b-user');
    $('.b-user').html('<div class="b-user__item b-user__avatar b-user__avatar_small"><img class="b-user__avatar__img" src="http://www.gravatar.com/avatar/' + localStorage.getItem('emailHash') + '?s=30&d=mm"/></div>' +
        '<div class="b-user__item b-user__name">' + localStorage.getItem('displayname') + '</div>' +
        '<div class="b-user__item b-user__profile b-user__profile_header"><a class="b-link b-user__profile__link" href="/profile">Profile</a></div>' +
        '<div class="b-user__item b-user__logout"><a class="b-link b-user__logout__link" href="/logout">Logout</a></div>');

//    $('.b-user__logout__link').on('click', function () {
//        if(Math.random()>=0.5) {
//            lego.setCookie('sid', undefined);
//            localStorage.email = null;
//            localStorage.objectId = null;
//            localStorage.fullname = null;
//            localStorage.displayname = null;
//            localStorage.location = null;
//            localStorage.emailHash = null;
//            document.location = '/';
//
//            return false;
//        } else{
//            return true;
//        }
//    });
};






