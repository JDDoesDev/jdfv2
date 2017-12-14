const gulp = require('gulp');
const livereload = require('gulp-livereload');
const rename = require('gulp-rename');
const gulpIf = require('gulp-if');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const scsslint = require('gulp-scss-lint');
const svgSprite = require("gulp-svg-sprites");
const pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function () {
  return gulp.src('./src/images/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
  .pipe(gulp.dest('./img'));
});


gulp.task('sass', function () {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});

gulp.task('scss-lint', function() {
  return gulp.src(['./src/scss/**/*.scss', '!./src/scss/component/**/*.scss', '!./src/scss/jquery-ui/**/*.scss', '!./src/scss/font-awesome/**/*.scss'])
    .pipe(scsslint({
      'config': 'lint.yml',
      'maxBuffer': 1000000
    })
  );
});


function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint != null && file.eslint.fixed;
}

gulp.task("compress", function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'));
});

// Custom CSS filename
gulp.task('sprites', function () {
    return gulp.src('img/svg/*.svg')
        .pipe(svgSprite({
            cssFile: "./scss/_sprite.scss"
        }))
        .pipe(gulp.dest("src"));
});

gulp.task('eslint', function(){
  gulp.src(['./src/js/*.js'])
  .pipe(eslint({

          "extends": "eslint:recommended",
         "env": {
            "browser": true
          },
          "globals": {
            "Drupal": true,
            "drupalSettings": true,
           "drupalTranslations": true,
            "domready": true,
            "jQuery": true,
           "_": true,
            "matchMedia": true,
            "Backbone": true,
            "Modernizr": true,
            "CKEDITOR": true
          },
        "rules": {
          // Errors.
          "array-bracket-spacing": [2, "never"],
          "block-scoped-var": 2,
         "brace-style": [2, "stroustrup", {"allowSingleLine": true}],
          "comma-dangle": [2, "never"],
          "comma-spacing": 2,
          "comma-style": [2, "last"],
          "computed-property-spacing": [2, "never"],
          "curly": [2, "all"],
          "eol-last": 2,
          "eqeqeq": [2, "smart"],
          "guard-for-in": 2,
          "indent": [2, 2, {"SwitchCase": 1}],
          "key-spacing": [2, {"beforeColon": false, "afterColon": true}],
          "linebreak-style": [2, "unix"],
          "lines-around-comment": [2, {"beforeBlockComment": true, "afterBlockComment": false}],
          "new-parens": 2,
          "no-array-constructor": 2,
          "no-caller": 2,
          "no-catch-shadow": 2,
          "no-empty-label": 2,
          "no-eval": 2,
          "no-extend-native": 2,
          "no-extra-bind": 2,
          "no-extra-parens": [2, "functions"],
          "no-implied-eval": 2,
          "no-iterator": 2,
          "no-label-var": 2,
          "no-labels": 2,
          "no-lone-blocks": 2,
          "no-loop-func": 2,
          "no-multi-spaces": 2,
          "no-multi-str": 2,
          "no-native-reassign": 2,
          "no-nested-ternary": 2,
          "no-new-func": 2,
          "no-new-object": 2,
         "no-new-wrappers": 2,
          "no-octal-escape": 2,
          "no-process-exit": 2,
          "no-proto": 2,
          "no-return-assign": 2,
          "no-script-url": 2,
          "no-sequences": 2,
          "no-shadow-restricted-names": 2,
          "no-spaced-func": 2,
          "no-trailing-spaces": 2,
          "no-undef-init": 2,
          "no-undefined": 2,
          "no-unused-expressions": 2,
          "no-unused-vars": [2, {"vars": "all", "args": "none"}],
         "no-with": 2,
          "object-curly-spacing": [2, "never"],
          "one-var": [2, "never"],
          "quote-props": [2, "consistent-as-needed"],
          "semi": [2, "always"],
          "semi-spacing": [2, {"before": false, "after": true}],
          "space-after-keywords": [2, "always"],
          "space-before-blocks": [2, "always"],
          "space-before-function-paren": [2, {"anonymous": "always", "named": "never"}],
          "space-in-parens": [2, "never"],
          "space-infix-ops": 2,
          "space-return-throw-case": 2,
          "space-unary-ops": [2, { "words": true, "nonwords": false }],
          "spaced-comment": [2, "always"],
          "strict": 2,
          "yoda": [2, "never"],
          // Warnings.
          "max-nested-callbacks": [1, 3],
          "valid-jsdoc": [1, {
            "prefer": {
                "returns": "return",
                "property": "prop"
            },
            "requireReturn": false
          }]
        },
        fix: true,

  }))
  .pipe(eslint.format())
  // if fixed, write the file to dest
  .pipe(gulpIf(isFixed, gulp.dest('./js/')));;
});

gulp.task('watch', function(){
    livereload.listen();

    gulp.watch('./src/scss/**/*.scss', ['sass', 'scss-lint']);
    gulp.watch('./src/js/**/*.js', ['compress']);
    gulp.watch(['./css/style.css', './**/*.html.twig', './js/*.js'], function (files){
        livereload.changed(files)
    });
});
