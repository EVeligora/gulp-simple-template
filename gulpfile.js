var gulp = require('gulp'),
    scss = require('gulp-sass'),
    browserSync = require('browser-sync'),
    terser = require('gulp-terser'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

//----------------------------------------------------Compiling
// expanded - полностью развёрнутый CSS;
// nested - показывает вложенность (по умолчанию);
// compact - каждый селектор на новой строке;
// compressed - всё в одну строку.
// .pipe(sass({outputStyle: 'compressed'}))

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
            .pipe(scss({outputStyle: 'compressed'}))
            .pipe(autoprefixer({
                overrideBrowserslist:  ['last 8 versions'],
                }))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
    return gulp.src('app/js/**/*.js')
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('code', function(){
    return gulp.src('app/*.html')
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server : {
            baseDir: "app"
        }
    })
});

// gulp.task('js', function(){
//     return gulp.src(
//         ['app/libs/slick-carousel/slick/slick.js', 
//             'app/libs/magnific-popup/dist/jquery.magnific-popup.js'])
//         .pipe(concat('libs.min.js'))
//         .pipe(terser())
//         .pipe(gulp.dest('app/js'))
// });

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/js/**/*.js', gulp.parallel('script'))
    gulp.watch('app/*.html', gulp.parallel('code'))
});

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));