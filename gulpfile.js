const gulp = require('gulp')
	, deploy = require('gulp-gh-pages');

gulp.task('deploy', function () {
	return gulp.src("./build/**/*")
		.pipe(deploy({
			// remoteUrl: 'https://github.com/OleksandrPavlyshch/arozon.git'
		}));
});

require('require-dir')('./gulp-tasks/', {recurse: true});