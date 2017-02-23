var env = require('node-env-file');
env(__dirname + '/.env');
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        concat: {
            bowerjs: {
                src: [
                    './bower_components/jquery/dist/jquery.min.js',
                    './bower_components/datatables/media/js/jquery.dataTables.min.js',
                    './bower_components/angular/angular.min.js',
                    './bower_components/angular-sanitize/angular-sanitize.min.js',
                    './bower_components/angular-bootstrap/ui-bootstrap.js',
                    './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    './bower_components/angular-datatables/dist/angular-datatables.min.js',
                    './bower_components/angular-route/angular-route.min.js',
                    './bower_components/angular-animate/angular-animate.min.js',
                    './bower_components/angular-messages/angular-messages.min.js',
                    './bower_components/angular-aria/angular-aria.min.js',
                    './bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    './bower_components/underscore/underscore-min.js',
                    './bower_components/angular-underscore-module/angular-underscore-module.js',
                    './bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                    './bower_components/angular-bootstrap-slider/slider.js',
                    './bower_components/angular-breadcrumb/dist/angular-breadcrumb.min.js',
                    './bower_components/ng-notify/dist/ng-notify.min.js',
                    './bower_components/angular-breadcrumb/dist/angular-breadcrumb.js',
                    './bower_components/textAngular/dist/textAngular-rangy.min.js',
                    './bower_components/textAngular/dist/textAngular-sanitize.min.js',
                    './bower_components/textAngular/dist/textAngular.min.js',
                    './bower_components/angular-socket-io/socket.min.js',
                    './bower_components/ng-tags-input/ng-tags-input.min.js',
                    './bower_components/angular-md5/angular-md5.min.js',
                    './bower_components/angular-resource/angular-resource.js'
                ],
                dest: './public/bower.js'
            },
            scriptsjs: {
                src: [
                    './source/modules/app.js',
                    './source/modules/**/index.js',
                    './source/modules/**/*.js'
                ],
                dest: './public/scripts.js'
            },
            bowercss: {
                src: [
                    './bower_components/angular/angular.csp.css',
                    './bower_components/bootstrap/dist/css/bootstrap.min.css',
                    './bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                    './bower_components/font-awesome/css/font-awesome.min.css',
                    './bower_components/textAngular/dist/textAngular.css',
                    './bower_components/ngtoast/dist/ngToast-animations.min.css',
                    './bower_components/angular-datatables/dist/css/angular-datatables.min.css',
                    './bower_components/ng-notify/dist/ng-notify.min.css',
                    './bower_components/ng-tags-input/ng-tags-input.min.css'
                ],
                dest: './public/bower.css'
            },
            customcss: {
                src: [
                    './source/css/*.css'
                ],
                dest: './public/styles.css'
            }
        },
        cssmin: {
            styleSheets: {
                files: {
                    './public/styles.min.css': ['./public/bower.css', './public/styles.css']
                }
            }
        },
        copy: {
            default: {
                files: [{
                    cwd: './source/modules/',
                    src: './index.html',
                    dest: './public/',
                    expand: true
                }, {
                    cwd: './source/',
                    src: 'assets/**/*',
                    dest: './public/',
                    expand: true
                }, {
                    cwd: './source/',
                    src: 'fonts/**/*',
                    dest: './public/',
                    expand: true
                },{
                    cwd: './source/',
                    src: 'fonts/**/*',
                    dest: './public/',
                    expand: true
                }, {
                    cwd: './errors/',
                    src: './errors.json',
                    dest: './public/',
                    expand: true
                }, {
                    cwd: './translations/',
                    src: './*.json',
                    dest: './public/translations/',
                    expand: true
                }]
            }
        },
        ngconstant: {
            options: {
                dest: './public/env.js',
                name: 'ENV'
            },
            dist: {
                constants: {
                    'CONFIG': {
                        ASSETS_URL: process.env.ASSETS_URL
                    }
                }
            }
        },
        html2js: {
            options: {
                rename: function(moduleName) {
                    return moduleName.replace('../source/', '');
                }
            },
            main: {
                src: ['./source/modules/admin/**/view/*.html', './source/modules/blog/**/view/*.html', '!./source/modules/index.html'],
                dest: 'public/templates.js'
            },
        },
        uglify: {
            scripts: {
                files: {
                    './public/scripts.min.js': ['./public/scripts.js', './public/templates.js', './public/env.js']
                }
            }
        },
        clean: {
            default: ['./public/**.css', '!./public/**.min.css']
        },
        watch: {
            scripts: {
                files: ['./source/modules/**/*.js'],
                tasks: ['concat']
            },
            css: {
                files: ['./source/css/*.css'],
                tasks: ['concat', 'cssmin']
            },
            html: {
                files: ['./source/modules/admin/**/view/*.html', './source/modules/blog/**/view/*.html'],
                tasks: ['concat', 'copy', 'html2js']
            }
        },
        notify: {
            copy: {
                options: {
                    title: 'Files Copied',
                    message: 'Went just fine!'
                }
            },
            html: {
                options: {
                    title: 'HTML source files copied!',
                    message: 'Went just fine!'
                }
            },
            css: {
                options: {
                    title: 'CSS concatenated and minified!',
                    message: 'No issues!'
                }
            },
            scripts: {
                options: {
                    title: 'JavaScript uglified!',
                    message: 'All good here!'
                }
            },
            gruntfile: {
                options: {
                    title: 'Gruntfile reloaded!',
                    message: 'Gruntfile has been reloaded! Check your terminal!'
                }
            }
        },
        nodemon: {
            start: {
                script: 'app.js'
            }
        },
        concurrent: {
            default: ['build', 'start'],
            options: {
                logConcurrentOutput: true
            }
        }
    });
    //Loading NPM tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ng-constant');

    //Concurrent tasks
    grunt.registerTask('default', ['concurrent:default']);
    grunt.registerTask('start', ['nodemon:start']);
    grunt.registerTask('build', ['concat', 'copy', 'html2js', 'ngconstant', 'cssmin', 'clean', 'watch']);
};
