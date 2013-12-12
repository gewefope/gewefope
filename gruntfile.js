module.exports = function (grunt) {
    grunt.initConfig({


        jade: {
            html: {
                files: {
                    'public/': ['src/views/*.jade', 'src/**/*.jade']
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
                    'public/default.css': 'src/blocks/default.styl'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 9']
            },
            single_file: {
                src: 'public/default.css',
                dest: 'public/default.css'
            }
        },
        csso: {
            compress: {
                options: {
                    report: 'min',
                    banner: '/* (c) World Fly */'
                },
                files: {
                    'public/default.min.css': ['public/default.css']
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-csso');


    grunt.registerTask('default', ['jade', 'stylus', 'autoprefixer', 'csso']);
};