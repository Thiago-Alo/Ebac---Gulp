const { series, parallel } = require('gulp');
const babel = require('gulp-babel');
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass') (require('node-sass'));
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const stripJs = require('gulp-strip-comments');
const stripCss = require('gulp-strip-css-comments');
const htmlmin = require('html-minifier');
mime = require('mime');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload

function tarefasCSS(cb) {
    gulp.src([
            './node_modules/bootstrap/dist/css/bootstrap.css',
            './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
            './vendor/owl/css/owl.css',
            './vendor/jquery-ui/jquery-ui.css',
            // './src/css/style.css',
        ])
        .pipe(stripCss()) // remove comentários css
        .pipe(concat('libs.css')) // mescla arquivos
        .pipe(cssmin()) // minifica css
        .pipe(rename({ suffix: '.min' })) // styles.min.css
        .pipe(gulp.dest('./dist/css')) // cria arquivo em novo diretório
        .on('end', cb); // informa que a tarefa está concluída
}

function tarefaSASS(cb){
    gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
    
        return cb();
}

function tarefasJS() {
    return gulp
        .src([
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './vendor/owl/js/owl.js',
            './vendor/jquery-mask/jquery.mask.js',
            './vendor/jquery-ui/jquery-ui.js',
            './src/js/custom.js',
        ])
        .pipe(stripJs()) // remove comentários
        .pipe(concat('scripts.js')) // mescla arquivos
        .pipe(uglify()) // minifica js
        .pipe(rename({ suffix: '.min' })) // scripts.min.js
        .pipe(gulp.dest('./dist/js')); // cria arquivo em novo diretório
}

function tarefasImagem() {
    return import('gulp-image').then((image) => {
        return gulp
            .src('./src/images/*')
            .pipe(
                image.default({
                    pngquant: true,
                    optipng: false,
                    zopflipng: true,
                    jpegRecompress: false,
                    mozjpeg: true,
                    gifsicle: true,
                    svgo: true,
                    concurrent: 10,
                    quiet: true,
                })
            )
            .pipe(gulp.dest('./dist/images'));
    });
}

// POC - Proof of Concept
gulp.task('minify-html', () => {
    return gulp
        .src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

function tarefasHTML() {
    return gulp.src('src/*.html').pipe(gulp.dest('dist'));
}

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './dist',
            mime: {
                'text/javascript': ['js']
            }
        },
    });
    gulp.watch('./src/**/*').on('change', process); // repete o processo quando alterar algo em src
    gulp.watch('./src/**/*').on('change', reload);
});

function end(cb) {
    console.log('tarefas concluídas');
    return cb();
}



// series x parallel
const process = parallel( tarefasHTML, tarefasJS, tarefasCSS, tarefasImagem, tarefaSASS, end)

exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem
exports.sass = tarefaSASS

exports.default = process