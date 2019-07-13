const extension = /\.mdx$/;

module.exports = {
  pageExtensions: ["tsx", "mdx"],

  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.module.rules.push({
      test: extension,
      use: [
        defaultLoaders.babel,
        {
          loader: require.resolve("./mdx-loader")
        }
      ]
    });

    config.node = {
      fs: "empty"
    };

    return config;
  }
};
