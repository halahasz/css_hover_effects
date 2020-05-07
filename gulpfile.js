// =========================================================
// gulpfile.js
// =========================================================
// ------------------------------------------------ requires
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  del = require('del'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  gulpIf = require('gulp-if'),
  cssnano = require('gulp-cssnano'),
  vinylPaths = require('vinyl-paths'),
  imagemin = require('gulp-imagemin');

// ------------------------------------------------- configs
var paths = {
  sass: {
    src: 'assets/scss/**/*.scss',
    dest: 'assets/css',
    opts: {}
  },
  html: {
    src: './*.html'
  },
  js: {
    src: 'assets/js/**/*.js'
  },
  img: {
    src: 'assets/img/**/*.+(png|jpg|jpeg|gif|svg|mp4|ogv)'
  },
  fonts: {
    src: 'assets/fonts/**/*'
  }
};

// ---------------------------------------------- Gulp Tasks

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  })
})

gulp.task('html', function () {
  return gulp.src(paths.html.src)
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }))
});

gulp.task('js', function () {
  return gulp.src(paths.js.src)
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }))
});

gulp.task('sass', function () {
  return gulp.src(paths.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }))
});

gulp.task('images', function () {
  return gulp.src(paths.img.src)
    .pipe(imagemin({
      interlaced: true,
    }))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean', function () {
  return gulp.src('./dist/*')
    .pipe(vinylPaths(del))
});

gulp.task('useref', function () {
  return gulp.src('*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('./dist'));
});

// ------------------------------------ Gulp Testing Message
gulp.task('message', function () {
  console.log('It works!!');
});

// ---------------------------------------------- Gulp Watch
gulp.task('watch', function () {
  gulp.watch(paths.sass.src, gulp.series('sass'));
  gulp.watch(paths.html.src, gulp.series('html'));
  gulp.watch(paths.js.src, gulp.series('js'));
});

// -------------------------------------------- Default task
gulp.task('default', gulp.series('sass',
  gulp.parallel('message', 'browserSync', 'watch')
));

gulp.task('build', gulp.series('clean',
  gulp.parallel('sass','useref', 'images', 'fonts')
));

