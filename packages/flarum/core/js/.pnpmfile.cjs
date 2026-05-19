module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name === 'bundlewatch' && pkg.dependencies?.axios) {
        pkg.dependencies.axios = '0.31.1';
      }

      if (pkg.name === 'http-proxy-agent' && pkg.dependencies?.['@tootallnate/once']) {
        pkg.dependencies['@tootallnate/once'] = '3.0.1';
      }

      return pkg;
    },
  },
};
