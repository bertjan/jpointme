var grunt = require('grunt');
var path = require('path');

module.exports = function (config) {
    config.set({
            basePath: '../',
            frameworks: ['jasmine'],
            files: [
                "bower_components/angular/angular.js",
                "bower_components/angular-resource/angular-resource.js",
                "bower_components/angular-sanitize/angular-sanitize.js",
                "bower_components/angular-mocks/angular-mocks.js",
                "bower_components/jasmine-jquery/lib/jasmine-jquery.js",
                'test/webapp/mocks/**/*.js',
                'src/webapp/js/*.js',
                'src/webapp/js/**/*.js',
                'test/webapp/unit/**/*.js'
            ],
            exclude: [
            ],
            plugins: [
                'karma-jasmine',
                'karma-junit-reporter',
                'karma-coverage',
                'karma-chrome-launcher',
                'karma-ng-html2js-preprocessor'
            ],
            preprocessors: {
                'src/webapp/partials/*.html': 'html2js',
                'src/webapp/**/*.js': 'coverage'
            },
            ngHtml2JsPreprocessor: {
                stripPrefix: 'src/webapp/'
            },
            reporters: ['progress', 'coverage', 'junit'],
            junitReporter: {
                outputFile: 'results/karma/results.xml'
            },
            coverageReporter: {
                reporters: [
                    {type: 'html', dir: 'results/karma/coverage'},
                    {type: 'json', dir: 'results/karma/coverage'}
                ]
            },
            colors: true,
            logLevel: config.LOG_INFO,
            autoWatch: true,
            browsers: ['Chrome'],
            captureTimeout: 10000,
            singleRun: false
        }
    );
};
