const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir);
};

module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/android_asset/www/' : '/',
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    css: {
        loaderOptions: {
            less: {
                globalVars: require(resolve('src/assets/less/static.less.js'))
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('api', resolve('src/api'))
            .set('utils', resolve('src/utils'))
            .set('cpn', resolve('src/components'))
            .set('pages', resolve('src/pages'));
    }
};
