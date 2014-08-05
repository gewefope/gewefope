var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var prefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");


gulp.task('jsClient', function () {
    gulp.src(['src/js/library.js', 'src/blocks/user/user.js', 'src/blocks/map/map.js', 'src/blocks/chcontainer/chcontainer.js', 'src/blocks/search/search.js', 'src/blocks/weather/weather.js', 'src/blocks/weather/_city/_city.js', 'src/blocks/weather/_location/_location.js', 'src/blocks/error/error.js', 'src/blocks/weather/select/select.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('default.js'))
        .pipe(jshint())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(gulp.src(['./dist/js/default.js', 'src/js/runtime.js'])
            .pipe(concat('global.js'))
            .pipe(gulp.dest('./dist/js/'))
    )
        .pipe(gulp.src('./dist/js/global.js')
            .pipe(uglify())
            .pipe(rename('global.min.js'))
            .pipe(gulp.dest('./dist/js/'))
    );
    gulp.src(['./src/pages/home/home.js','./src/pages/index/index.js', './src/pages/login/login.js', '/src/pages/signup/signup.js', './src/pages/profile/profile.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('./dist/js/pages/'));

});

gulp.task('jsServer', function () {
    return gulp.src(['server.js', 'api/weather.js', 'api/user.js', 'gulpfile.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('jade', function () {

    gulp.src(['./src/pages/index/index.jade','./src/pages/login/login.jade','./src/pages/signup/signup.jade','./src/pages/profile/profile.jade', './src/pages/home/home.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/pages/'));

});

gulp.task('css', function () {
    gulp.src('src/blocks/default.styl')
        .pipe(stylus())
        .pipe(prefix("last 2 versions"))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(gulp.src('dist/css/default.css')
            .pipe(csso())
            .pipe(rename('default.min.css'))
            .pipe(gulp.dest('./dist/css/'))
    );

    gulp.src('./src/pages/home/home.styl')
        .pipe(stylus())
        .pipe(prefix("last 2 versions"))
        .pipe(gulp.dest('./dist/css/pages'))
        .pipe(gulp.src('dist/css/pages/home.css')
            .pipe(csso())
            .pipe(rename('home.min.css'))
            .pipe(gulp.dest('./dist/css/pages'))
    );


//    gulp.src('dist/css/default.css')
//        .pipe(csso())
//        .pipe(rename('default.min.css'))
//        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('default', ['jsServer', 'jsClient', 'jade', 'css']);