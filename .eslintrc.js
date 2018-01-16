module.exports = {
    'parser': 'babel-eslint',
    'plugins': [ 'mocha' ],
    'env': {
        'browser': true,
        'es6': true,
        'commonjs': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'sourceType': 'module'
    },
    'rules': {

        // 4 Spaces for indentions.
        'indent': [ 'error', 4, {
            'SwitchCase': 1
        } ],

        // Require unix style linegbreaks.
        'linebreak-style': [ 'error', 'unix' ],

        // Require single-quotes.
        'quotes': [ 'error', 'single' ],

        // Require semicolons.
        'semi': [ 'error', 'always' ],

        // Set console.* usage to warning and allow console.info, console.warn and console.error
        'no-console': [
            'warn', {
                'allow': [ 'info', 'warn', 'error' ]
            }
        ],

        // Inline objects (and import statements) must have spaces.
        'object-curly-spacing': [ 'warn', 'always' ]
    },

    'globals': {
        'google': false,
        'it': false,
        'describe': false,
        'beforeEach': false,
        'afterEach': false,
    }
};
