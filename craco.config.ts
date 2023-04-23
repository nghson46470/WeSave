const path = require('path')

module.exports = {
    webpack: {
        alias: {
            '~/': path.resolve(__dirname, './src/'),
            '~/pages': path.resolve(__dirname, './src/pages'),
            '~/components': path.resolve(__dirname, './src/components'),
            '~/layout': path.resolve(__dirname, './src/layout'),
            '~/config': path.resolve(__dirname, './src/config'),
            '~/routes': path.resolve(__dirname, './src/routes'),
            '~/modules': path.resolve(__dirname, './src/modules'),
            '~/Hook': path.resolve(__dirname, './src/Hook'),
            '~/assets': path.resolve(__dirname, './src/assets'),
            '~/api': path.resolve(__dirname, './src/api'),
            '~/interfaces': path.resolve(__dirname, './src/interfaces'),
            '~/redux': path.resolve(__dirname, './src/redux'),
            '~/redux/hook': path.resolve(__dirname, './src/redux/hook'),
        },
    },
}
