const path = require('path')
const webpack = require('webpack')
const SriPlugin = require('webpack-subresource-integrity')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  lintOnSave: 'default',
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index', 'runtime']
    }
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/_variables.scss";
        `
      },
      postcss: {
        path: path.resolve(__dirname)
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // add sri
      config.plugin('sri').use(SriPlugin, [
        {
          hashFuncNames: ['sha256', 'sha384'],
          enabled: true
        }
      ])

      // only load things from same-origin
      config.output.crossOriginLoading('anonymous')

      // optimize webpack caching
      config.optimization.set('moduleIds', 'hashed')
      config.optimization.runtimeChunk('single')

      // reconfigure terser to keep function names for vuex
      config.optimization.minimizer('terser').use(TerserPlugin, [
        {
          cache: true,
          parallel: true,
          terserOptions: {
            compress: {
              ecma: 6
            },
            output: {
              ecma: 6,
              comments: /^\**!|@preserve|@license|@cc_on/i
            },
            ecma: 6,
            keep_fnames: true,
            toplevel: true
          }
        }
      ])

      config.resolve.alias.set('bootstrap-vue$', 'bootstrap-vue/src/index.js')
      config.module.rule('js').exclude.add(/node_modules\/(?!bootstrap-vue\/src\/)/)

      config.plugin('html-index').tap(options => {
        delete options[0].minify // dont minifiy the index page

        return options
      })
    }
  }
}
