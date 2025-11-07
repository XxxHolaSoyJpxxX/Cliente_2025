const gulp = require('gulp');
const sass = require('gulp-sass')(require('saas'));

gulp.task('estilos', function() {
  return gulp.src('src/scss/**/*.scss') // carpeta de archivos SASS
    .pipe(sass()) // compila SASS y log de errores
    .pipe(gulp.dest('dist/styles')); // carpeta de salida CSS
});