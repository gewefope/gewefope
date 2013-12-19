module.exports = function (grunt) {
    grunt.initConfig({


        jade: {
            html: {
                files: {
                    'public/': ['src/views/*.jade', 'src/views/**/*.jade']
                },
                options: {
                    pretty: true,
                    client: false
                }
            }

        },
        stylus: {
            compile: {
                options: {
                    'include css': true,
                    'paths': ['src/blocks/*'],
                    'compress': true
                },
                files: {
                    //'public/global.css': 'src/blocks/global.styl'
                    'public/global.css': ['src/blocks/reset.styl', 'src/blocks/page/page.styl', 'src/blocks/logo/logo.styl', 'src/blocks/container/container.styl', 'src/blocks/link/link.styl', 'src/blocks/wcontent/wcontent.styl', 'src/blocks/footer/footer.styl', 'src/blocks/weather/weather.styl', 'src/blocks/map/map.styl', 'src/blocks/disabled/disabled.styl', 'src/blocks/search/search.styl', 'src/blocks/wlist/wlist.styl', 'src/blocks/chcontainer/chcontainer.styl', 'src/blocks/header/header.styl', 'src/blocks/error/error.styl']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 9']
            },
            single_file: {
                src: 'public/global.css',
                dest: 'public/global.css'
            }
        },
        uglify: {
            my_target: {
                options: {
                    report: 'min',
                    banner: '/* (c) World Fly */ \n'
                },
                files: {
                    'public/lib.min.js': ['src/js/library.js']
                }
            },
            borschik: {
                options: {
                    report: 'min',
                    banner: '/* (c) World Fly */ \n'
                },
                files: {
                    'public/js/global.min.js': ['public/js/global.js']
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
                    'public/global.min.css': ['public/global.css']
                }
            }
        },
        shell: {
            server: {
                command: 'node app.js'
            },
            broschik1: {
                command: 'node_modules/.bin/borschik --input=src/blocks/global.js --minimize=no --output=public/global.js'
            }
        },
        borschik: {
            files: {
                'public/global.js': ['src/blocks/global.js']
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
                files:{
                    'public/index.html': 'public/index.html'
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/js/library.js', 'src/blocks/chcontainer/chcontainer.js', 'src/blocks/search/search.js', 'src/blocks/weather/weather.js'],
                dest: 'public/js/global.js'
            }
        },
        watch: {
            options: {
                atBegin: true,
                livereload: true
            },
            pages: {
                files: ['src/**/*.jade'],
                tasks: 'jade'
            },
            styles: {
                files: ['src/blocks/**/*.styl'],
                tasks: ['stylus', 'autoprefixer', 'csso']
            },
            scripts: {
                files: [
                    'src/**/*.js'
                ],
                tasks: ['concat', 'uglify:borschik']
            }
        },
        connect: {
            server: {
                options: {
                    livereload: true,
                    base: 'public/'
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.registerTask('default', ['jade', 'stylus', 'autoprefixer', 'csso', 'concat', 'uglify:borschik', 'htmlmin']);
    //grunt.registerTask('server', ['shell:server']);
    grunt.registerTask('server', ['connect', 'watch']);
};