const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('gulp-browserify');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('default', () => {
	gulp.watch('./assets/scss/**/*.scss', ['sass']);
	gulp.watch('./assets/js/src/**/*.js', ['js']);
});

gulp.task('sass', () => {
	return gulp.src('./assets/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 50 versions'],
			cascade: false
		}))	
		.pipe(sourcemaps.write('./sourcemaps'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('js', () => {
	return gulp.src('./assets/js/src/*.js')
		.pipe(sourcemaps.init())
		.pipe(
			browserify({
				insertGlobals : true,
				debug : !gulp.env.production
			})	
		)
		.pipe(babel({
			presets: ["es2015"]
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write('./sourcemaps'))
		.pipe(gulp.dest('./assets/js/dist'));
});

