import * as path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27570
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/main.tsx",
  // ファイルの出力設定
  output: {
    // 出力ファイルのディレクトリ名
    path: path.join(__dirname, "dist"),
    // 出力ファイル名
    filename: "bundle.js",
    // バンドルファイルをアップロードする場所
    publicPath: "/assets",
  },
  module: {
    rules: [
      {
        // 拡張子 .ts、.tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    // 省略可能な拡張子を配列で指定
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    // 絶対パスで記述されたimportの解決
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    // エイリアスの定義方法
    alias: {
      "@components": path.resolve(__dirname, "src", "components"),
      "@features": path.resolve(__dirname, "src", "features"),
    },
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "static"),
    open: true,
    port: 3000,
  },
};

export default config;
