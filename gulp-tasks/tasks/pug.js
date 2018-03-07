const gulp = require('gulp')
	, pug = require('gulp-pug')
	, plumber = require('gulp-plumber')
	, fs = require('fs')
	, configs = require('../configs');


gulp.task('pug', () => {
	let pugJson = JSON.parse( fs.readFileSync(configs.source.pugJson, { encoding: 'utf8' }));

	return gulp.src(configs.source.pug)
	.pipe(plumber())
	.pipe(pug({
		pretty: !configs.production
		, locals: pugJson
		, indent_size: 2
		, wrap_attributes: 'auto'
		, preserve_newlines: true
		, end_with_newline: true
	}))
	.pipe(gulp.dest(configs.build.root));
});

gulp.task('pug:watch', () => {
	gulp.watch(configs.source.pug_watch, ['pug']);
});