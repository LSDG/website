module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        settings: {
            server: {
                address:'192.168.1.100',
                port:8080
            },
            debug: {
                livereload: {
                    url: 'http://<%=settings.server.address%>:35729/livereload.js',
                    enable: false
                }
            }
        },
        folders: {
            base: {
                out:'dist',
                source:'src',
                vendor:'vendor',
                vendor_source:'vendor_source',
                assets: 'assets',
                fonts:'fonts',
                temp:'temp'
            },
            source: {
                app:'app',
                plugins:'plugins',
                less:'less',
                lodash:'lodash'
            },
            dist: {
                css:'css',
                js:'js',
                plugins:'plugins',
                scripts:'scripts',
                img:'img',
                fonts:'fonts',
                assets:'assets'
            },
            vendor: {
                bootstrap:'bootstrap'
            }
        },
        files: {
            source: {
                less:['<%=paths.source.less%>/app.less','<%=paths.app.less%>/**/*.less']
            },
            dist: {
                css:['<%=folders.dist.css%>/**/*.css'],
                js: {
                    vendor:['<%=folders.dist.scripts%>/**/angular.js','<%=folders.dist.scripts%>/**/*.js'],
                    app:['<%=folders.dist.js%>/modules.js','<%=folders.dist.js%>/*.js','<%=folders.dist.js%>/**/*.js'],
                    plugins:['<%=folders.dist.plugins%>/**/modules.js','<%=folders.dist.plugins%>/**/*.js']
                }
            }
        },
        paths: {
            temp: '<%=folders.base.temp%>',
            source: {
                app:'<%=folders.base.source%>/<%=folders.source.app%>',
                plugins:'<%=folders.base.source%>/<%=folders.source.plugins%>',
                less:'<%=folders.base.source%>/<%=folders.source.less%>',
                lodash:'<%=folders.base.source%>/<%=folders.source.lodash%>'
            },
            dist: {
                css:'<%=folders.base.out%>/<%=folders.dist.css%>',
                js:'<%=folders.base.out%>/<%=folders.dist.js%>',
                plugins:'<%=folders.base.out%>/<%=folders.dist.plugins%>',
                vendor:'<%=folders.base.out%>/<%=folders.dist.scripts%>',
                images:'<%=folders.base.out%>/<%=folders.dist.img%>',
                fonts:'<%=folders.base.out%>/<%=folders.dist.fonts%>',
                assets:'<%=folders.base.out%>/<%=folders.dist.assets%>'
            },
            vendor: {
                'base':'<%=folders.base.vendor%>'
            },
            vendor_source: {
                bootstrap:'<%=folders.base.vendor_source%>/<%=folders.vendor.bootstrap%>'
            }
        },
        // Task configuration.
        clean: {
            dist: ['<%=folders.base.out%>'],
            temp: ['<%=paths.temp%>']
        },
        copy: {
            lodash: {
                options: {
                    processContent: grunt.template.process
                },
                expand: true,
                cwd:'<%=paths.source.lodash%>/',
                src:['**/*.js','**/*'],
                dest:'<%=folders.base.out%>'
            },
            assets: {
                expand: true,
                cwd:'<%=folders.base.assets%>/',
                src:['**/*'],
                dest:'<%=paths.dist.assets%>',
                flatten: false
            },
            fonts: {
                expand: true,
                cwd:'<%=folders.base.fonts%>/',
                src:['**/*'],
                dest:'<%=paths.dist.fonts%>',
                flatten: false
            },
            vendor_js: {
                expand: true,
                cwd:'<%=folders.base.vendor%>/',
                src:['**/*.js'],
                dest:'<%=paths.dist.vendor%>',
                flatten: true
            },
            vendor_css: {
                expand: true,
                cwd:'<%=folders.base.vendor%>/',
                src:['**/*.css'],
                dest:'<%=paths.dist.css%>',
                flatten: true
            },
            app_js: {
                expand: true,
                cwd:'<%=paths.source.app%>/',
                src:['**/*.js'],
                dest:'<%=paths.dist.js%>',
                flatten: false
            },
            app_html: {
                expand: true,
                cwd:'<%=paths.source.app%>/',
                src:['**/*.html'],
                dest:'<%=folders.base.out%>',
                flatten: false
            },
            plugins_js: {
                expand: true,
                cwd:'<%=paths.source.plugins%>/',
                src:['**/*.js'],
                dest:'<%=paths.dist.plugins%>',
                flatten: false
            }
        },
        concat: {
            options: {
                separator: '\n',
                process: false
            },
            less: {
                src:['<%=paths.source.less%>/imports.less','<%=paths.source.app%>/**/*.less'],
                dest:'<%=paths.temp%>/build.less'
            }
        },
        less: {
            app: {
                options: {
                    compress: false,
                    cleancss: false,
                    paths: ['<%=paths.source.less%>/','<%=paths.vendor_source.bootstrap%>/less/']
                },
                files: {
                    '<%=paths.dist.css%>/app.css':['<%=paths.temp%>/build.less']
                }
            }
        },
        jshint: {
            app: [
                '<%=paths.source.app%>/**/*.js'
            ],
            plugins: [
                '<%=paths.source.plugins%>/**/*.js'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            }
        },
        delta: {
            css: {
                files:['<%=paths.source.less%>/**/*.less','<%=paths.source.app%>/**/*.less'],
                tasks:['build:css','clean:temp']
            },
            js: {
                files:['<%=paths.source.app%>/**/*.js','<%=paths.source.plugins%>/**/*.js'],
                tasks:['build:test','build:js','enable-livereload','build:templates']
            },
            templates: {
                files:['<%=paths.source.lodash%>/**/*','<%=paths.source.app%>/**/*.html'],
                tasks:['enable-livereload','build:templates']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files:['<%=folders.base.out%>/**/*']
            }
        },
        build: {
            test:['jshint'],
            css:['concat:less','less:app'],
            vendor:['copy:vendor_js','copy:vendor_css','copy:fonts'],
            assets:['copy:assets'],
            js:['copy:app_js','copy:plugins_js'],
            templates:['set-options','copy:lodash','copy:app_html']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    //Load custom tasks
    grunt.loadTasks('tasks');

    //Server tasks
    grunt.registerTask('web-server', function() {
        var fileServer = new (require('node-static')).Server('./' + grunt.config('folders.base.out'),{cache:false});
        require('http').createServer(function(req,res) {
            fileServer.serve(req, res);
        }).listen(grunt.config('settings.server.port'));

    });

    grunt.renameTask('watch','delta');

    grunt.registerTask('watch', function() {
        grunt.task.run('enable-livereload','build-debug','web-server','delta');
    });

    grunt.registerTask('enable-livereload', function() {
        grunt.config('settings.debug.livereload.enable',true);
    });

    grunt.registerTask('set-options', function() {
        var socketConfig = grunt.config.get('settings.socketio.' + (grunt.option('env') || 'default'));
        grunt.config.set('settings.socketio.config',socketConfig);
    });

    grunt.registerMultiTask('build',function() {
        grunt.log.writeln('Building ' + this.target + ' [' + this.data + ']');
        grunt.task.run(this.data);
    });

    grunt.registerTask('build-debug', function() {
        grunt.task.run(['set-options','clean:dist','build','clean:temp']);
    });
};