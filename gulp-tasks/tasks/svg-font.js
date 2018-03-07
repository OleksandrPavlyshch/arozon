const gulp = require('gulp')
	, plumber = require('gulp-plumber')
	, iconfont = require("gulp-iconfont")
	, iconfontCss = require('gulp-iconfont-css')
	, configs = require('../configs');


// icon font
const fontname = 'svgfont';

gulp.task('svg-font', () => {
	return gulp.src([configs.source.svgFontsAssets])
		.pipe(plumber())
		.pipe(iconfontCss({
			fontName: fontname
			, path: 'source/helpers/_svgfont.sass'
			, targetPath: '../../' + configs.source.sassFolder + '_svgfont.sass'
			, fontPath: '../fonts/'
			, cssClass: 'icon'
		}))
		.pipe(iconfont({
			fontName: fontname
			, prependUnicode: true
			, formats: ['ttf', 'eot', 'woff', 'woff2']
			, normalize: true
			, fontHeight: 1001
			, fontStyle: 'normal'
			, fontWeight: 'normal'
		}))
		.pipe(gulp.dest(configs.build.fonts));
});


gulp.task('svg-font:watch', () => {
	gulp.watch(configs.source.helpers + '*.*', ['svg-font']);
});