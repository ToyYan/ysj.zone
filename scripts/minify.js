'use strict'
let htmlMinify
let jsMinify

function hexoMinifyHtml(data) {
  if (!htmlMinify) htmlMinify = require('html-minifier').minify
  return htmlMinify(data, {
    collapseWhitespace: true,
    // removeComments: true, enable this read more doesn't work
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  })
}

hexo.extend.filter.register('after_render:html', hexoMinifyHtml)

function hexoMinifyJs(data) {
  if (!jsMinify) jsMinify = require('uglify-js').minify
  const result = jsMinify(data)
  if (!result.error) {
    return result.code
  }
  return data
}

hexo.extend.filter.register('after_render:js', hexoMinifyJs)

// const meta_generator = require('hexo/lib/plugins/filter/meta_generator')
// hexo.extend.filter.unregister('after_render:html', meta_generator)
