var gulp=require('gulp');
var src=process.cwd()+'/src';
var assets=process.cwd()+'/assets';
//构建css，顺序为clean->copy(slices)->less->sprite->cssmin->clean-slices

//css构建完成删除中间产物slices
gulp.task('clean-slices',function(){
	var clean=require('gulp-clean');
	return gulp.src(assets+'/slices')
		.pipe(clean());
});
//构建初始清理工作目录
gulp.task('clean',function(){
	var clean=require('gulp-clean');
	return gulp.src(assets)
		.pipe(clean());
});
//复制slices到assets/slices，在这之前先执行clean(异步执行)
gulp.task('copy',['clean'],function(){
	return gulp.src(src+'/slices/*')
		.pipe(gulp.dest(assets+'/slices'));
});
//编译所有css、less文件
gulp.task('less',['copy'],function(){
	var less=require('gulp-less');
	var concat=require('gulp-concat');
	return gulp.src([src+'/css/*.css',src+'/css/*.less'])
		.pipe(less())
		.pipe(concat('style.css'))
		.pipe(gulp.dest(assets+'/css'));
});
//自动生成雪碧图和相应的css文件
gulp.task('sprite',['less'],function(){
	var time=new Date();
	var sprite=require('gulp-css-spritesmith');
	var cssmin=require('gulp-cssmin');
	//var base64=require('gulp-css-base64');
	return gulp.src(assets+'/css/*.css')
		.pipe(sprite({
	        // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
	        imagepath: assets+'/slices/',
	        // 映射CSS中背景路径，支持函数和数组，默认为 null
	        imagepath_map: null,
	        // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
	        spritedest: assets+'/sprites/',
	        // 替换后的背景路径，默认 ../images/
	        spritepath: '../sprites/',
	        // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
	        padding: 0,
	        // 是否使用 image-set 作为2x图片实现，默认不使用
	        useimageset: false,
	        // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
	        newsprite: false,
	        // 给雪碧图追加时间戳，默认不追加
	        spritestamp: false,
	        // 在CSS文件末尾追加时间戳，默认不追加
	        cssstamp: false
	    }))  
        .pipe(gulp.dest('./'));
});
//最后对完成的css文件压缩，并清理中间产物
gulp.task('cssmin',['sprite'],function(){
	var cssmin=require('gulp-cssmin');
	return gulp.src(assets+'/css/*.css')
		.pipe(cssmin())		
		.pipe(gulp.dest(assets+'/css/'))
		.on('end',function(){
			gulp.start('clean-slices')
		});
})；
//将css加上10位md5，并修改html中的引用路径，该动作依赖cssmin
gulp.task('md5:css', ['cssmin'], function (done) {
	var md5=require('gulp-md5-plus');
    gulp.src(assets+'/css/*.css')
        .pipe(md5(10, assets+'/app/*.html'))
        .pipe(gulp.dest(assets+'/css'))
        .on('end', done);
});
