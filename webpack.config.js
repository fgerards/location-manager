var path = require('path');
var webpack = require('webpack');

//
// NIMIUS Example Webpack config. This configuration requires the following node modules:
//
// - webpack                                      // Webpack core
// - bael-core                                    // Babel core
// - babel-loader                                 // Babel loader integration in webpack
// - babel-plugin-syntax-dynamic-import           // Babel plugin. See below
// - babel-plugin-transform-class-properties      // Babel plugin. See below
// - babel-plugin-transform-runtime               // Babel plugin. See below
// - babel-preset-env                             // Babel plugin. See below
// - html-loader                                  // Allows loading of HTML Templates
//
module.exports = {

    // Simple sourcemaps for development
    devtool: 'cheap-source-map',

    // Entrychunks: These are the entry files for the application
    entry: {
        'main': './Resources/Private/Javascripts/main.js',
    },


    output: {

        // Output directory
        path: path.resolve(__dirname, 'Resources/Public/Javascripts/Distribution'),

        // Output filename.
        // "[name]" will be replaced by the chunk name. In this example 'footer'
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/typo3conf/ext/location_manager/Resources/Public/Javascripts/Distribution/',
    },

    // Module / Loader configuration. Loaders define the way files are loaded.
    // In this case we use a babel loader for all javascript files
    module: {
        loaders: [
            {
                test: /js-marker-clusterer/,
                loader: 'exports-loader?MarkerClusterer'
            },
            {
                // This loader will affect all .js and .jsx files except in node_modules
                test: /\.(js|jsx)$/,
                exclude: /(node_modules(?!\/@nimius))/,

                // Use babel-loader. Requires the 'babel-loader' Node module to be installed
                loader: 'babel-loader',

                // Babel configuration
                query: {

                    // Plugins to use:
                    // - transform-runtime adds support for most ES6 syntax
                    // - transform-class-properties adds support for static class properties
                    // - syntax-dynamic-import adds support for async import statements
                    //  (not important at this point)
                    //
                    // Requires the node modules
                    // - babel-plugin-transform-runtime
                    // - babel-plugin-transform-class-properties
                    // - babel-plugin-syntax-dynamic-import
                    plugins: [
                        'transform-runtime',
                        'transform-class-properties',
                        'syntax-dynamic-import'
                    ],
                    cacheDirectory: true,

                    // Using the 'env' preset:
                    // It allows defining supported versions in a similar fashion as
                    // postcss.
                    //
                    // Requires the 'babel-preset-env' node module.
                    presets: [
                        [ 'env', {
                            'targets': {
                                'browsers': [
                                    'last 2 versions',
                                    'ie >= 10'
                                ],
                                'useBuiltIns': true
                            }
                        } ]
                    ]
                }
            },

            // Use the html-loader for html files.
            // This loader allows for easy import of HTML templates
            //
            // Requires the html-loader node module
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader',
                query: { minimize: true }
            }
        ]
    },

    // Plugins can be used to extend the default behaviour.
    // These are important for production builds or edge-cases.
    plugins: [

    ],

    // This section can be used to alias certain module names to specific files.
    // This has two uses:
    //
    // We can define custom path prefixes, that are nicer looking than real paths
    // (for example: "~styleguide/library/dom-helpers" instead of "../../../../../../../../../styleguide/src/assets/toolkit/scripts/library/dom-helpers")
    //
    // Some libraries for example export their unminified sources (which makes sense)
    // put also include really well minified production builds (way better minified than
    // what we could achieve).
    resolve: {
        alias: {
            // Example path alias
            // '~styleguide': path.resolve(__dirname, '../../../../../../../../../styleguide/src/assets/toolkit/scripts'),

            // Optimized paths for angular (1.x and vue.js)
            // angular: path.resolve(__dirname, 'node_modules/angular/angular.min.js'),
            'vue$': 'vue/dist/vue.esm.js',

        }
    }

};