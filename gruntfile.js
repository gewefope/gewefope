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
                    'public/global.css': 'src/blocks/global.styl'
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
            listFolders: {
                command: 'node app.js'
            }
        }

    });


    grunt.loadNpmTasks('grunt-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-shell');


    grunt.registerTask('default', ['jade', 'stylus', 'autoprefixer', 'csso']);
    grunt.registerTask('server', ['shell']);
};