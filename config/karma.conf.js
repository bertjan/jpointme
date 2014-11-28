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
                'test/mocks/**/*.js',
                'src/js/*.js',
                'src/js/**/*.js',
                'test/unit/**/*.js'
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
                'src/partials/*.html': 'html2js',
                'src/**/*.js': 'coverage'
            },
            ngHtml2JsPreprocessor: {
                stripPrefix: 'src/'
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
