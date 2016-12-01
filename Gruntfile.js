'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        jsdoc: {
            dist: {
                src: ['Resources/Public/Javascripts/LocationManager.js'],
                options: {
                    destination: './doc',
                    configure: './jsdoc.json',
                    readme: 'README.md'
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        concat: {
            options: {
                stripBanners: true,
                separator: '\n;;\n'
            },
            dist: {
                files: {
                    'Resources/Public/Javascripts/Distribution/LocationManager.js': [
                        'Resources/Public/Javascripts/Source/Vendor/*.js',
                        'Resources/Public/Javascripts/Source/*.js',
                        'Resources/Public/Javascripts/Source/Controller/*.js',
                    ]
                }
            }
        },

        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015'],
                plugins: ['transform-class-properties']
            },
            dist: {
                files: {
                    'Resources/Public/Javascripts/Distribution/LocationManager.js': 'Resources/Public/Javascripts/Distribution/LocationManager.js'
                }
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'Resources/Public/Javascripts/Source/',
                    src: [
                        '*.js',
                        'Controller/*.js'
                    ],
                    dest: 'Tests/Frontend/build',
                    ext: '.js',
                }],
                options: {
                    sourceMaps: 'both'
                }
            }
        },

        watch: {
            scripts: {
                files: ['Resources/Public/Javascripts/Source/**/*.js'],
                tasks: ['concat', 'babel']
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('build', ['concat', 'babel:dist', 'jsdoc']);
    grunt.registerTask('test', ['babel:test', 'karma'])
};