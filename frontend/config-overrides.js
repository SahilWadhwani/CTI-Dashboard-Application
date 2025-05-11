module.exports = function override(config, env) {
  config.devServer = {
    ...config.devServer,
    allowedHosts: 'all',  // Allow all hosts
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  };
  return config;
};
