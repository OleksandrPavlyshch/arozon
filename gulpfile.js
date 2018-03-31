const gulp = require('gulp')
	, ghpages = require('gh-pages');

gulp.task('publish', () => {
	ghpages.publish('build', {
		branch: 'gh-pages',
		repo: 'https://github.com/OleksandrPavlyshch/arozon-dev.git'
		}, (err) => {
			console.log(err);
			console.log('Publish');
		});
});

require('require-dir')('./gulp-tasks/', {recurse: true});+