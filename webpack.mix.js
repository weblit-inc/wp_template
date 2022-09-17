'use strict'

const mix = require('laravel-mix')

mix
  .postCss('src/app.css', 'theme/assets/css', [require('tailwindcss')])
  .js('src/js/*.js', 'theme/assets/js')
  .browserSync(require('./bs-config'))
