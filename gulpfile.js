const gulp = require('gulp')
const less = require('gulp-less')
const del = require('del')
const autoprefix = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')

gulp.task('clean', () => {
  del.sync('build')
})
gulp.task('less', () => {
  gulp
    .src(['src/**/*.less'])
    .pipe(less())
    .pipe(
      autoprefix({
        browsers: ['last 2 versions', 'Firefox > 20'],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest('build'))
})
gulp.task('babel', () => {
  gulp
    .src(['src/app.js'])
    .pipe(babel())
    .pipe(gulp.dest('build'))
})

gulp.task('default', ['clean', 'less', 'babel '], () => {
  console.log('done')
})

gulp.task('watch', () => {
  const watcher = gulp.watch('src/**/*.less ', ['default'])
  watcher.on('change', function(event) {
    console.log('file' + event.path + 'was' + event.type + 'running task ...')
  })
})
