var gulp = require("gulp"),
    fs = require('fs'),
    gulpif = require('gulp-if'),
    data = require('gulp-data'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,

    pug = require('gulp-pug'),

    sass = require('gulp-sass'),
    mock = require('./mock.js'),
    ts = require('gulp-typescript'),

    rootPath = 'app',

    imgPath = "./" + rootPath + "/imgs",
    scssPath = "./" + rootPath + "/scss",
    htmlPath = "./" + rootPath + "/pug",
    jsPath = "./" + rootPath + "/js",

    // condition = (process.argv[2] === 'build' ? true : false),
    // outPath = (condition === true ? "build" : "debug"),
    outPath = "build",
    condition = false,
    outhtmlPath = outPath + "/",
    outcssPath = outPath + "/css",
    outjsPath = outPath + "/js",
    outImgPath = outPath + "/imgs";

gulp.task('pug', () =>
    gulp.src([htmlPath + '/**/*.pug', '!' + htmlPath + '/share/**'])
    .pipe(
        gulpif(
            fs.existsSync('./' + htmlPath + '/share/config_' + outPath + '.json'), data(function () {
                return require('./' + htmlPath + '/share/config_' + outPath + '.json');
            })
        )
    )
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest(outhtmlPath))
    .pipe(reload({
        stream: true
    }))
);

gulp.task('scss', () =>
    gulp.src(scssPath + '/*.scss')
    .pipe(sass().on('error', sass.logError).on('error', function () {
        throw ('scss转css错误');
    }))
    .pipe(gulp.dest(outcssPath))
    .pipe(reload({
        stream: true
    }))
);

gulp.task('js', () =>
    gulp.src(jsPath + '/*')
    .pipe(gulp.dest(outjsPath))
    .pipe(reload({
        stream: true
    }))
)

gulp.task('img', () =>
    gulp.src(imgPath + '/**/*')
    .pipe(gulp.dest(outImgPath))
    .pipe(reload({
        stream: true
    }))
)

gulp.task('ts', () =>
    gulp.src([jsPath + '/*.ts', '!' + jsPath + '/config_' + (condition === true ? 'debug' : 'build') + '.ts'])
    .pipe(ts({
        noImplicitAny: true,
        outFile: 'test.js'
    }))
    .pipe(gulp.dest(outjsPath))
    .pipe(reload({
        stream: true
    }))
)

//服务器
gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: './' + outPath + '/',
            directory: false,
            index: ["index.html"],
            tunnel: true,
            middleware: mock.data()
        }
    });
    gulp.watch(htmlPath + '/**/*.pug', gulp.series('pug'));
    gulp.watch(scssPath + '/**/*.scss', gulp.series('scss'));
    gulp.watch(jsPath + '/**/*.js', gulp.series('js'));
    gulp.watch(imgPath + '/**/*', gulp.series('img'));
});

//服务器
gulp.task('watchTs', function () {
    gulp.watch(jsPath + '/**/*.ts', gulp.series('ts'));
});

gulp.task('default', gulp.series('pug', 'scss', 'js', 'img', 'server'));
gulp.task('build', gulp.series(['pug', 'scss', 'js', 'img']));