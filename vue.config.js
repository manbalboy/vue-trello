module.exports = {
    devServer: {
        overlay: false,
    },
    runtimeCompiler: true,
    publicPath: process.env.NODE_ENV === 'production' ? '/vue-trello/' : '/',
    // vue: 'vue/dist/vue.esm-bundler.js',
};
