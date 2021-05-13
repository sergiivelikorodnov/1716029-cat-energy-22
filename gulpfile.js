const gulp = require("gulp");
const plumber = require("gulp-plumber");
const terser = require("gulp-terser");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const htmlmin = require("gulp-htmlmin");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const svgstore = require("gulp-svgstore");
const svgmin = require('gulp-svgmin');
const newer = require('gulp-newer');
const del = require("del");
const sync = require("browser-sync").create();


// Styles Build

const styles = (done) => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(postcss([csso()]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
  done();
}
exports.styles = styles;

//HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
}
exports.html = html;

//Scripts

const scripts = (done) => {
  return gulp.src("source/js/script.js")
    .pipe(gulp.dest('build/js'))
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
  done();
}
exports.scripts = scripts;


//Optimize Images
const optimizeImages = () => {
  return gulp.src("source/img/*.{jpg,png,svg}")
    .pipe(newer("build/img"))
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest("build/img"));
}
exports.images = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"))
}

exports.images = copyImages;


//Webp Images
const webpImages = (done) => {
  gulp.src("build/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 50 }))
    .pipe(gulp.dest("build/img"));

  done();
}

exports.webp = webpImages;

//SVG Sprite
const sprite = () => {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;


// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/css/*.css",
    "source/favicon/*.*",
    "source/img/**/*.svg",
    "source/css/*.css",
    "!source/img/sprite/*.svg"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;


// Clean

const clean = () => {
  return del("build");
};


// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/script.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    webpImages
  )
);

exports.build = build;

// Default


exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    webpImages
  ),
  gulp.series(
    server,
    watcher
  ));
