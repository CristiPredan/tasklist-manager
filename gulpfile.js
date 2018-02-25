var gulp = require('gulp');
var sass = require('gulp-sass');
var npmDist = require('gulp-npm-dist');
var browserSync = require('browser-sync').create();


gulp.task('styles', function(){
 gulp.src('./scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream: true})); 
});

gulp.task('scripts', function(){
 gulp.src('./scripts/main.js')
    .pipe(browserSync.reload({stream: true})); 
});


gulp.task('serve', function () {

  browserSync.init({
    server: {
      baseDir:'./'
    }
  });

  gulp.watch('./scss/*.scss', ['styles']);
  gulp.watch('./scripts/*.js', ['scripts']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);  

});

gulp.task('default', ['styles', 'serve', 'scripts']);
