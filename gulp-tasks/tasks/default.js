const gulp = require('gulp')
	, configs = require('../configs')
	, runSequence = require('run-sequence');

gulp.task('default', () => {
	configs.setEnv('development');
	configs.logEnv();
	runSequence(
		[/*'svg-font', 'favicons', 'icon-sprite',*/ 'sprite:svg', 'copy', 'scripts', 'images', 'list-pages']
		, 'bower', 'sass', 'nunjucks',/* 'pug',*/ 'server', 'watch');
});
