const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');

gulp.task('sass', function() {
  return gulp
    .src('./resource/sass/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
    )
    .pipe(gulp.dest('./docs/css'));
});

gulp.task('pug', function() {
  return gulp
    .src('./resource/pug/*.pug')
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest('./docs/'));
});

gulp.task('server', function() {
  browserSync.init({
    server: './docs/'
  });

  gulp.watch('./resource/sass/*.scss', ['sass']);
  gulp.watch('./resource/pug/*.pug', ['pug']);
  gulp.watch('./docs/*.html', ['serverReload']);
  gulp.watch('./docs/css/*.css', ['serverReload']);
});

gulp.task('serverReload', function() {
  browserSync.reload();
});

gulp.task('serverNoWatch', function() {
  browserSync.init({
    server: './'
  });
});

gulp.task('imagemin', function() {
  gulp
    .src('./resource/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./docs/images'));
});
