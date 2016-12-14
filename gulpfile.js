var gulp=require('gulp');
var src=process.cwd()+'/src';
var assets=process.cwd()+'/assets';
gulp.task('copy',function(){
	return gulp.src(src+'/images/*')
		.pipe(gulp.dest(assets+'/images'));
});
gulp.task('clean',function(){
	var clean=require('gulp-clean');
	return gulp.src(assets+'/*/*')
		.pipe(clean());
});
gulp.task('lessmin',['clean','copy'],function(){
	var less=require('gulp-less');
	var concat=require('gulp-concat');
	return gulp.src([src+'/css/*.css',src+'/css/*.less'])
		.pipe(less())
		.pipe(concat('style.css'))
		.pipe(gulp.dest(assets+'/css'));
});
