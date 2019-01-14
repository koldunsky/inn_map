module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

    // Defie plugin
    config.plugin('define').tap(definitions => {
      definitions[0] = Object.assign(definitions[0], {
        __DEV__: process.env.NODE_ENV === 'development',
      });
      return definitions
    })
  },
};
