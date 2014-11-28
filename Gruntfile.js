'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        config: {
            hosts: {
                runtime: '0.0.0.0'
            },
            paths: {
                tmp: '.tmp',
                base: require('path').resolve(),
                src: 'src/webapp',
                test: 'test/webapp',
                results: 'results',
                instrumented: 'instrumented',
                config: 'config',
                build: 'build'
            }
        },
        clean: {
            files: [
                '<%=config.paths.tmp%>',
                '<%=config.paths.results%>',
                '<%=config.paths.instrumented%>',
                '<%=config.paths.build%>'
            ]
        },
        jshint: {
            options: {
                jshintrc: '<%=config.paths.base%>/.jshintrc',
                reporter: require('jshint-junit-reporter'),
                reporterOutput: '<%=config.paths.results%>/jshint/jshint.xml'
            },
            files: {
                src: ['<%=config.paths.src%>/**/*.js']
            }
        },
        karma: {
            options: {
                singleRun: true,
                reporters: ['progress', 'coverage', 'junit']
            },
            unit: {
                configFile: '<%=config.paths.config%>/karma.conf.js'
            }
        },
        less: {
            development: {
                options: {
                    sourceMap: true,
                    dumpLineNumbers: 'comments',
                    relativeUrls: true
                },
                files: {
                    "<%=config.paths.src%>/css/jpointme.css": "<%=config.paths.src%>/css/jpointme.less"
                }
            }
        },
        concat: {
            options: {
                separator: grunt.util.linefeed + ';' + grunt.util.linefeed
            },
            angular: {
                files: {
                    'build/js/angular.min.js': ['bower_components/angular/angular.min.js']
                }
            },
            modules: {
                files: {
                    'build/js/modules.min.js': [
                        'bower_components/angular-*/*.min.js',
                        'bower_components/firebase/firebase.js',
                        'bower_components/angularfire/dist/angularfire.min.js'
                    ]
                }
            },
            plugins: {
                files: {
                    'build/js/plugins.min.js': [
                        'bower_components/jquery/dist/jquery.min.js',
                        'bower_components/bootstrap/js/carousel.js'
                    ]
                }
            },
            jpointme: {
                files: {
                    '.tmp/js/jpointme.js': [
                        '<%=config.paths.src%>/js/jpointme.js',
                        '<%=config.paths.src%>/js/**/*.js']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! j.point.me <%= grunt.template.today("dd-mm-yyyy HH:MM:ss") %> */\n'
            },
            jpointme: {
                files: {
                    'build/js/jpointme.min.js': ['.tmp/js/jpointme.js']
                }
            }
        },
        instrument: {
            files: '<%=config.paths.src%>/**/*.js',
            options: {
                basePath: '<%=config.paths.instrumented%>',
                lazy: true
            }
        },
        portPick: {
            options: {
                port: 9000
            },
            protractor: {
                targets: [
                    'connect.options.port'
                ]
            }
        },
        connect: {
            options: {
                port: 0,
                hostname: '<%= config.hosts.runtime%>'
            },
            runtime: {
                options: {
                    open: {
                        target: 'http://<%= config.hosts.runtime%>:<%= connect.options.port%>/<%=config.paths.src%>'
                    },
                    middleware: function (connect) {
                        var config = grunt.config.get('config');

                        return [
                            connect().use('/' + config.paths.src + '/bower_components', connect.static('./bower_components')),
                            connect().use('/' + config.paths.src + '/js', connect.static(config.paths.instrumented + '/' + config.paths.src + '/js')),
                            connect().use('/' + config.paths.src, connect.static(config.paths.src))
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: {
                        target: 'http://<%= config.hosts.runtime%>:<%= connect.options.port%>'
                    },
                    middleware: function (connect) {
                        var config = grunt.config.get('config');

                        return [
                            connect().use('/', connect.static(config.paths.build))
                        ];
                    }
                }
            },
            test: {
                options: {
                    open: false,
                    middleware: function (connect) {
                        var config = grunt.config.get('config');

                        return [
                            connect().use('/' + config.paths.src + '/bower_components', connect.static('./bower_components')),
                            connect().use('/' + config.paths.src + '/js', connect.static(config.paths.instrumented + '/' + config.paths.src + '/js')),
                            connect().use('/' + config.paths.src, connect.static(config.paths.src)),
                            connect().use('/' + config.paths.test, connect.static(config.paths.test))
                        ];
                    }
                }
            }
        },
        protractor_coverage: {
            options: {
                keepAlive: true,
                noColor: false,
                debug: false,
                coverageDir: '<%=config.paths.results%>/protractor/coverage',
                args: {
                    resultsDir: '<%=config.paths.results%>/protractor',
                    baseUrl: 'http://<%= config.hosts.runtime %>:<%= connect.test.options.port %>',
                    specs: [
                        '<%=config.paths.test%>/protractor/**/*Spec.js',
                        '<%=config.paths.test%>/protractor/**/*spec.js'
                    ]
                }
            },
            test: {
                options: {
                    keepAlive: true,
                    configFile: '<%=config.paths.config%>/protractor.conf.js'
                }
            }
        },
        makeReport: {
            src: '<%=config.paths.results%>/protractor/coverage/*.json',
            options: {
                type: 'lcov',
                dir: '<%=config.paths.results%>/protractor/coverage',
                print: 'detail'
            }
        },
        watch: {
            test: {
                files: [
                    '<%=config.paths.instrumented%>/<%=config.paths.src%>/{,*/}*.js'
                ]
            }
        },
        copy: {
            jpointme: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%=config.paths.src%>',
                        dest: '<%=config.paths.build%>',
                        src: [
                            'img/{,*/}*.{gif,webp,svg,png,jpg}'
                        ]
                    }
                ]
            }
        },
        cssmin: {
            build: {
                files: {
                    'build/css/jpointme.min.css': [
                        '<%=config.paths.src%>/css/jpointme.css'
                    ]
                }
            }
        },
        htmlmin: {
            jpointme: {
                options: {
                    removeComments: false,
                    collapseWhitespace: false
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%=config.paths.src%>',
                        src: ['*.html'],
                        dest: 'build'
                    }
                ]
            }
        },
        usemin: {
            html: ['build/{,*/}*.html'],
            css: ['build/css/{,*/}*.css'],
            options: {
                dirs: ['build']
            }
        },
        shell: {
            bowerupdate: {
                command: function () {
                    return './node_modules/bower/bin/bower update';
                }
            }
        }
    });

    grunt.registerTask('serve', 'Serve the app.', [
        'clean',
        'portPick',
        'package',
        'connect:dist',
        'watch'
    ]);


    /** Prepare the build with all the necessary stuff. */
    grunt.registerTask('prepare', 'Prepare the build with all the necessary stuff.', [
        'clean',
        'shell:bowerupdate',
        'portPick'
    ]);

    grunt.registerTask('test', 'Execute tests.', [
        'force:on',
        'jshint',
        'karma'
//        'instrument',
//        'connect:test',
//        'protractor_coverage',
//        'makeReport'
    ]);

    grunt.registerTask('verify', 'Verify if the current state meets the criteria.', function () {
        grunt.log.subhead('Not applicable yet');
    });

    grunt.registerTask('package', 'Package the code in a distributable format.', [
        'less',
        'copy',
        'concat',
        'htmlmin',
        'uglify',
        'cssmin',
        'usemin'
    ]);

    grunt.registerTask('integration-test', 'Execute tests against the packaged distribution.', function () {
        grunt.log.subhead('Not applicable yet');
    });

    grunt.registerTask('release', 'Release if compliant to all checks.', function () {
        grunt.log.subhead('Not applicable yet build');
    });

    grunt.registerTask('default', [
        'prepare',
        'test',
        'verify',
        'package',
        'integration-test',
        'release'
    ]);
};
