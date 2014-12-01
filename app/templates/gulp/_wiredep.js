'use strict';

var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  return gulp.src('src/index.html')
    .pipe(wiredep({
      directory: 'bower_components'<% if(wiredepExclusions.length > 0) { %>,
      exclude: [<%= wiredepExclusions.join(', ') %>]<% } %>
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('wiredep:docs', function() {
  var wiredep = require('wiredep').stream;

  return gulp.src('docs/src/index.html')
    .pipe(wiredep({
      bowerJson: require('../docs/bower.json'),
      directory: 'docs/bower_components',
      exclude: [/bootstrap-sass-official/, /bootstrap.js/, /open-sans-fontface/]
    }))
    .pipe(gulp.dest('docs/src'));
});
