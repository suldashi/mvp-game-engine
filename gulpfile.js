const gulp = require('gulp');
const browserify = require('browserify');
const minify = require('gulp-minify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

let taskPath = "";

function setIntroVar() {
	taskPath = "intro";
	return Promise.resolve();
}

function setTimersVar() {
	taskPath = "timers";
	return Promise.resolve();
}

function setCollisionVar() {
	taskPath = "collision";
	return Promise.resolve();
}

function bundle() {
	return browserify({entries:`src/${taskPath}/engine.js`,debug:false})
		.bundle()
		.pipe(source("engine.js"))
		.pipe(buffer())
		.pipe(gulp.dest(`public/${taskPath}/js`));
}

function watch() {
	return gulp.watch("src/**/*.js",gulp.series("default"));
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

//gulp.task('minify', compress);

gulp.task("browserify", bundle);
gulp.task("setIntroVar", setIntroVar);
gulp.task("setTimersVar", setTimersVar);
gulp.task("setCollisionVar", setCollisionVar);

//gulp.task("prod",gulp.series("browserify","minify"));
//gulp.task("dev", gulp.series("browserify"));

gulp.task("intro", gulp.series("setIntroVar","browserify"));
gulp.task("timers", gulp.series("setTimersVar","browserify"));
gulp.task("collision", gulp.series("setCollisionVar","browserify"));

gulp.task("watch", watch);
gulp.task("default", gulp.series("collision"));
gulp.task("all", gulp.series("intro", "timers", "collision"));
