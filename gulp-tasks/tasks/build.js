const gulp = require('gulp')
	, configs = require('../configs')
	, runSequence = require('run-sequence');

gulp.task('build', () => {
	configs.setEnv('production');
	configs.logEnv();
	runSequence(['favicons', 'copy', 'scripts', /*'svg-font', 'icon-sprite', */ 'sprite:svg', 'images'], 'sass', 'nunjucks'/*,'pug'*/);
});
