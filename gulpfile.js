var gulp = require('gulp');
var path = require('path');

gulp.task('bootstrap', function(){
	gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
   		.pipe(gulp.dest('./public/stylesheets'));

   	gulp.src('./bower_components/bootstrap/dist/js/bootstrap.min.js')
   		.pipe(gulp.dest('./public/javascripts'));

   	gulp.src('./bower_components/bootstrap/dist/fonts/*.*')
   		.pipe(gulp.dest('./public/fonts'));

    console.log('bootstrap');
});







