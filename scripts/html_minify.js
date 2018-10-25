'use strict'
let minify

function hexoMinify(data) {
  if (!minify) minify = require('html-minifier').minify
  return minify(data, {
    collapseWhitespace: true,
    // removeComments: true, enable this read more doesn't work
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  })
}

hexo.extend.filter.register('after_render:html', hexoMinify)

const meta_generator = require('hexo/lib/plugins/filter/meta_generator')
hexo.extend.filter.unregister('after_render:html', meta_generator)