'use strict'

const gulp = require('gulp')
const plumber = require('gulp-plumber')
const imagemin = require('gulp-imagemin')
const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant')
const imageminGiflossy = require('imagemin-giflossy')
const imageminSvgo = require('imagemin-svgo')
const srcPath = 'src/images/**/*.{jpg,jpeg,png,gif,svg}'

const minifyImages = () =>
  gulp
    .src(srcPath)
    .pipe(plumber())
    .pipe(
      imagemin([
        mozjpeg({
          quality: 75,
        }),
        pngquant({
          quality: [0.6, 0.8],
        }),
        imageminGiflossy({
          lossy: 80,
        }),
        imageminSvgo(),
      ])
    )
    .pipe(gulp.dest('theme/assets/images'))

gulp.task('dev', (cb) => {
  minifyImages()
  gulp.watch(srcPath, minifyImages)
  cb()
})

gulp.task('build', (cb) => {
  minifyImages()
  cb()
})
