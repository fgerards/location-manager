'use strict';

var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = function (grunt) {

    grunt.initConfig({

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        //
        // Webpack grunt configuration.
        // This configuration builds upon the webpack configuration defined in webpack.config.js.
        // Apart from the dependencies for the webpack configuration
        // This adds the following dependencies:
        //
        // - grunt-webpack                      // Webpack integration for grunt
        // - compression-webpack-plugin         // Gzip support for webpack
        //
        webpack: {

            // Load default dev configuration from webpack.config.js
            options: require('./webpack.config.js'),

            // Define webpack:dev as development configuration.
            // This task is used for development, is fast and does not do any optimizations.
            // This does not change anything from the default webpack config
            dev: {},

            // The wepack:prod plugin adds some options to the default webpack config.
            prod: {

                // Disable sourcemaps
                devtool: false,

                plugins: [

                    // Set global variable to indicate production mode to Javascript frameworks
                    // such as angular and vue
                    new webpack.DefinePlugin({
                        'process.env': { NODE_ENV: JSON.stringify('production') }
                    }),

                    // Add minifier & tree-shaking
                    new webpack.optimize.UglifyJsPlugin({ minimize: true }),

                    // Also generate .gz files at development time
                    new CompressionPlugin({
                        asset: "[path].gz[query]",
                        algorithm: "gzip",
                        test: /\.(js|html)/,
                        minRatio: .8
                    })
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build', ['webpack:prod']);
    grunt.registerTask('test', ['karma'])
};