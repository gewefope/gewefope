module.exports = function (grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        jade: {
            html: {
                options: {
                    pretty: true,
                    client: false,
                    data: {
                        timestamp: "<%= grunt.template.today('yyyy') %>"
                    }
                },
                files: {
                    "dist/pages/index.html": "src/views/index/index.jade",
                    "dist/pages/search.html": "src/views/index/search.jade",
                    "dist/pages/location.html": "src/views/weather/location.jade",
                    "dist/pages/city.html": "src/views/weather/city.jade",
                    "dist/pages/errors/404.html": "src/views/errors/404.jade"
                }
            }

        },
        stylus: {
            compile: {
                options: {
                    'include css': true,
                    'paths': ['src/blocks/*'],
                    'compress': false
                },
                files: {
                    'dist/public/css/global.css': ['src/blocks/font/font.styl', 'src/blocks/reset.styl', 'src/blocks/page/page.styl', 'src/blocks/logo/logo.styl', 'src/blocks/container/container.styl', 'src/blocks/link/link.styl', 'src/blocks/wcontent/wcontent.styl', 'src/blocks/footer/footer.styl', 'src/blocks/weather/weather.styl', 'src/blocks/map/map.styl', 'src/blocks/disabled/disabled.styl', 'src/blocks/search/search.styl', 'src/blocks/wlist/wlist.styl', 'src/blocks/chcontainer/chcontainer.styl', 'src/blocks/header/header.styl', 'src/blocks/error/error.styl', 'src/blocks/loader/loader.styl']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 9', 'ff 5']
            },
            single_file: {
                src: 'dist/public/css/global.css',
                dest: 'dist/public/css/global.css'
            }
        },
        uglify: {
            default: {
                options: {
                    report: 'gzip',
                    banner: '/* <%= grunt.template.today("yyyy") %> © World Fly */ \n'
                },
                files: {
                    'dist/public/js/global.min.js': ['dist/public/js/global.js']
                }
            }
        },
        csso: {
            compress: {
                options: {
                    report: 'min',
                    banner: '/* (c) World Fly */\n'
                },
                files: {
                    'dist/public/css/global.min.css': ['dist/public/css/global.css']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true

                },
                files: {
                    'dist/pages/index.html': 'dist/pages/index.html',
                    'dist/pages/city.html': 'dist/pages/city.html',
                    'dist/pages/location.html': 'dist/pages/location.html',
                    'dist/pages/search.html': 'dist/pages/search.html'
                }
            }
        },
        concat: {
            options: {
                separator: '\n\n\n\n',
                stripBanners: true,
                banner: '/* <%= grunt.template.today("yyyy") %> © World Fly */ \n'
            },
            dist: {
                src: ['src/js/library.js', 'src/blocks/chcontainer/chcontainer.js', 'src/blocks/search/search.js', 'src/blocks/map/map.js', 'src/blocks/weather/weather.js', 'src/blocks/weather/_city/_city.js', 'src/blocks/weather/_location/_location.js', 'src/blocks/error/error.js', 'src/blocks/weather/select/select.js'],
                dest: 'dist/public/js/global.js'
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    }
                ]
            },
            dist: {
                files: {
                    'dist/public/img/loader.svg': 'src/blocks/loader/loader.svg',
                    'dist/public/img/loader_black.svg': 'src/blocks/loader/loader_black.svg'
                }
            }
        },
        jshint: {
            beforeconcat: {
                src: ['server.js', 'gruntfile.js', 'src/js/library.js', 'src/blocks/map/map.js', 'src/blocks/chcontainer/chcontainer.js', 'src/blocks/search/search.js', 'src/blocks/weather/weather.js', 'src/blocks/weather/_city/_city.js', 'src/blocks/weather/_location/_location.js', 'src/blocks/error/error.js', 'src/blocks/weather/select/select.js']

            },
            afterconcat: {
                src: ['dist/public/js/global.js']
            }
        },
//        csslint: {
//            strict: {
//                src: ['dist/public/css/global.css']
//            }
//        }

    });


    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-csslint');


    grunt.registerTask('default', ['jade', 'stylus', 'autoprefixer', /*'csslint', 'csso',*/ 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', /*'uglify:borschik',*/ 'svgmin']);
    grunt.registerTask('production', ['jade', 'stylus',  'autoprefixer', 'csso', 'jshint:beforeconcat', 'concat',  'jshint:afterconcat', 'uglify', 'svgmin', 'htmlmin']);
};
