module.exports = {
    // publicPath: process.env.NODE_ENV === 'production'
    //   ? '/vuepothesis/'
    //   : '/'
    // ,
    chainWebpack: config => {
        config
          .plugin('html')
          .tap(args => {
          args[0].title = 'Vuepothesis';
          return args;
        });
      }
  }