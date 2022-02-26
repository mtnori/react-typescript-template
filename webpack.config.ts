import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { Configuration } from "webpack";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const devServer: DevServerConfiguration = {};

const isProduction = process.env.NODE_ENV === "production";

const config: Configuration = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: isProduction ? "production" : "development",
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
    // 画像ファイルの出力先
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        // 拡張子 .ts、.tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
      {
        test: /(\.css|\.scss)/,
        use: [
          // "style-loader",
          // CSSを書き出すオプションを有効にする
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: true,
              sourceMap: !isProduction,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        test: /.(png|jpe?g|gif|svg)$/i,
        // 閾値以上だったら埋め込まずファイルとして分離する
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 100KB以上だったら埋め込まずファイルとして分離する
            maxSize: 100 * 1024,
          },
        },
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
      "@images": path.resolve(__dirname, "src", "images"),
      "@components": path.resolve(__dirname, "src", "components"),
    },
  },
  plugins: [
    // CSSを外だしにするプラグイン
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
  ...(isProduction
    ? {}
    : {
        devtool: "eval-source-map",
      }),
  devServer: {
    static: {
      directory: path.join(__dirname, "static"),
    },
    open: true,
    port: 3000,
  },
};

export default config;
