import merge from "webpack-merge";
import TerserPlugin, { BasePluginOptions } from "terser-webpack-plugin";
import commonConfig from "~/webpack.config";

const terserOptions: BasePluginOptions = {
  parallel: false,
};

const config = merge(commonConfig, {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(terserOptions)],
  },
});

export default config;
