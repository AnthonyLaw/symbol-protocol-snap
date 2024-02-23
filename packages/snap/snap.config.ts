import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';
import webpack from 'webpack';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.ts'),
  server: {
    port: 8080,
  },
  polyfills: true,
  customizeWebpackConfig(config) {
    // Disable the `symbol-crypto-wasm-node` package, which is not compatible
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /symbol-crypto-wasm-node/,
        'empty-module',
      ),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    );

    return config;
  },
};

export default config;
