// Karma configuration
// Generated on Tue Oct 25 2016 16:23:37 GMT+0200 (CEST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // mocha: testing framework (provides describe, it, beforeEach, ...)
        // chai: assertion library (assert.equal, assert.isTrue, ...)
        // fixture: for loading fixtures
        // sinon: spy on methods
        frameworks: ['mocha'],

        // list of files / patterns to load in the browser
        files: [
            'https://maps.googleapis.com/maps/api/js?sensor=true&v=3&libraries=geometry,places',
            'Tests/Frontend/spec/**/*.spec.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'Tests/Frontend/spec/**/*.spec.js': ['webpack'],
        },

        webpack: require('./webpack.config'),

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox'],

        phantomjsLauncher: {
            exitOnResourceError: true
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        client: {
            mocha: {
                // a single test can take a maximum of 5 seconds
                timeout: 5000
            }
        }
    })
}
