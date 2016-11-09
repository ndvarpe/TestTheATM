/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    server = require('gulp-develop-server'),
    less = require('gulp-less'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    Server = require('karma').Server;

var options = {
    server: {
        path: './server.js',
        execArgv: ['--harmony']
    },
    browserSync: {
        proxy: 'http://localhost:8080'
    }
};

var serverFiles = [
    './server.js',
    './src/**/*.js',
    '!./src/**/*.spec.js'
];

gulp.task('default', ['server:start'], function () {
    gulp.watch(serverFiles, ['server:restart'])
});

// run server 
gulp.task('server:start', function () {
    runSequence('build-less', 'build-custom-less', 'startServer');
});

gulp.task('startServer', function () {
    server.listen(options.server, function (error) {
        if (!error) browserSync(options.browserSync);
    });
});

// restart server if server.js changed 
gulp.task('server:restart', function () {
    runSequence('build-less', 'build-custom-less');
    server.restart( function( error ) {
        if (!error) browserSync.reload();
    });
});

gulp.task('build-less', function () {
    return gulp.src('./node_modules/bootstrap-less/**/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest('./public/style'));
});

gulp.task('build-custom-less', function () {
    return gulp.src('./public/style/custom/custom.less')
        .pipe(less())
        .pipe(gulp.dest('./public/style/custom'));
});


gulp.task('run-specs', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});