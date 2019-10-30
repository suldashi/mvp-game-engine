const gulp = require('gulp');
const browserify = require('browserify');
const minify = require('gulp-minify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

function bundle() {
	return browserify({entries:"src/engine.js",debug:false})
		.bundle()
		.pipe(source("engine.js"))
		.pipe(buffer())
		.pipe(gulp.dest("public/js"));
};

function watch() {
	return gulp.watch("src/**/*.js",gulp.series("dev"));
}

function compress() {
	return gulp.src('public/js/engine.js')
	.pipe(minify({
		ext: {
			min:".min.js"
		}
	}))
	.pipe(gulp.dest('public/js'))
}
gulp.task('minify', compress);

gulp.task("browserify",bundle);
gulp.task("prod",gulp.series("browserify","minify"));
gulp.task("dev", gulp.series("browserify"));

gulp.task("watch", watch);

gulp.task("default", gulp.series("dev"));
