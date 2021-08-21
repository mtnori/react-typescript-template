import * as path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {

  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/main.tsx',
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js"
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.tsx$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    // 省略可能な拡張子を配列で指定
    extensions: [
      '.ts', '.tsx', '.js', '.jsx'
    ],
    // 絶対パスで記述されたimportの解決
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
};

export default config;