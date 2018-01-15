// Karma configuration
// Generated on Sun Jan 14 2018 12:26:22 GMT+0100 (Mitteleuropäische Zeit)

var BimServerMockFactory = function (config) {
	var express = require('express');
	var router = express.Router();
	router.get('/hello', function (req, res, next) {
        return res.end('Hello World');
    });
	router.post('/json', function (req, res, next) {
        return res.end(JSON.stringify({ "version": "1.0" }));
    });
    router.post('/upload', function (req, res, next) {
        return res.end(JSON.stringify({ "checkinid": "123" }));
    });
	return router;
}

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'test/**/*spec.js', watched: false }
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'test/**/*spec.js': ['rollup']
    },

	rollupPreprocessor: {
		plugins: [
			require('rollup-plugin-node-resolve')({jsnext: true, main: true, preferBuiltins: true, browser: true}),
			require('rollup-plugin-commonjs')({sourceMap: false}),
			require('rollup-plugin-babel')({exclude: ['node_modules/**']}) 
		],
		format: 'iife',
		name: 'bimserverapi',
		sourcemap: 'inline'
	},

	middleware: ['custom'],

	plugins: [
		'karma-jasmine', 'karma-phantomjs-launcher', 'karma-rollup-preprocessor',
		{'middleware:custom': ['factory', BimServerMockFactory]}
	],
	
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
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
