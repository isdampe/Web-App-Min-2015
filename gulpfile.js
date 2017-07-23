const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('gulp-browserify');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default', () => {
	gulp.watch('./assets/scss/**/*.scss', ['sass', 'autoprefix']);
	gulp.watch('./assets/js/src/**/*.js', ['js']);
});

gulp.task('sass', () => {
	return gulp.src('./assets/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write('./sourcemaps'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('autoprefix', () =>
	gulp.src('./assets/css/global.css')
	.pipe(autoprefixer({
		browsers: ['last 50 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('./assets/css/dist'))
);

gulp.task('js', () => {
	return gulp.src('./assets/js/src/app.js')
		.pipe(
			browserify({
				insertGlobals : true,
				debug : !gulp.env.production
			})	
		)
		.pipe(gulp.dest('./assets/js/dist'));
});
