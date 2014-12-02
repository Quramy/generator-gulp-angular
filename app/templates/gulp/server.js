'use strict';

var gulp = require('gulp');

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;

  if(baseDir === 'src' || (util.isArray(baseDir) && baseDir.indexOf('src') !== -1)) {
    routes = {
      // Should be '/bower_components': '../bower_components'
      // Waiting for https://github.com/shakyShane/browser-sync/issues/308
      '/bower_components': 'bower_components'
    };
  }

  if(baseDir === '.tmp_docs' || (util.isArray(baseDir) && baseDir.indexOf('.tmp_docs') !== -1)) {
    routes = {
      '/bower_components': 'docs/bower_components',
      '/deps': 'bower_components'
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    browser: browser
  });

}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([
    'src',
    '.tmp'
  ], [
    '.tmp/{app,components}/**/*.css',
    'src/assets/images/**/*',
    'src/*.html',
    'src/{app,components}/**/*.html',
    'src/{app,components}/**/*.js'
  ]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit('dist');
});

gulp.task('serve:docs', ['dgeni', 'wiredep:docs', 'module'], function(){
	browserSyncInit(['.tmp_docs', 'docs/app'], ['docs/app/*.html', 'docs/app/src/**/*']);
	gulp.watch(['docs/config/templates/**/*', 'docs/content/**/*', 'src/{app,components}/**/*.js'], ['dgeni', browserSync.reload]);
	gulp.watch(['src/{app,components}/**/*.js'], ['module']);
});

gulp.task('serve:docs:dist', ['build:docs'], function (){
  browserSyncInit('dist_docs');
});

gulp.task('serve:e2e', function () {
  browserSyncInit(['src', '.tmp'], null, []);
});

gulp.task('serve:e2e-dist', ['watch'], function () {
  browserSyncInit('dist', null, []);
});
