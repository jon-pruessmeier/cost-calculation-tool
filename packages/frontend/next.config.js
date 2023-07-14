//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config, { dev, isServer }) => {
    // Run ESLint on save in development mode
    if (dev && !isServer) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'eslint-loader',
        exclude: ['/node_modules/', '/.next/', '/out/'],
        options: {
          emitWarning: true,
          // Emit errors as warnings for faster development builds
          // Change eslint config to enable this
          emitError: false,
        },
      });
    }

    // Add PostCSS loader
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });
    return config;
  }
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
