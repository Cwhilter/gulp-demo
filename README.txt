这是我个人练习gulp构建工具时做的一个demo，整个文件分为两部分，开发目录src和产出目录assets。
开发时专注于src目录，assets则由构建工具自动生成
一、全局安装gulp-cli(未建立package.json文件可用npm init初始化)   npm install gulp-cli -g
二、本地安装gulp   npm install gulp --save-dev
三、建立gulpfile.js文件，这是gulp的配置文件
 简单介绍一下gulp配置常用的几个API。(个人理解，详细请参照中文官方文档http://www.gulpjs.com.cn/)
 例如：gulp.task('cssmin',['sprite'],function(){
			var cssmin=require('gulp-cssmin');
			return gulp.src(assets+'/css/*.css')
				.pipe(cssmin())		
				.pipe(gulp.dest(assets+'/css/'))
				.on('end',function(){
					gulp.start('clean-slices')
				});
		})
		gulp.task()用于任务配置，第一个参数为任务别名，第二个参数（可选）为异步执行任务（数组），数组内任务间同步执行，第三个参数为方法
		gulp.src()为stream读路径，可为数组
		.pipe()类似Linux管道，进行流式构建，函数间数据通过管道传输，减少操作硬盘引起的I/O问题，加快运行速度
		gulp.dest()为stream写路径
		.on()为任务绑定事件，异步执行

插件可到npm官方网站https://www.npmjs.com/查找，也可到gulp网站http://gulpjs.com/plugins/查找