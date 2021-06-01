const path = require("path"); // path: 노드에서 경로 조작 가능 하도록 해줌.
// process.env.NODE_ENV = 'production';
// 실서비스일 경우 환경변수를 production 설정해줘야한다.

module.exports = {
  name: "wordrelay-setting",
  mode: "development", // 실서비스: production으로 변경
  devtool: "eval", // 빠르게
  resolve: {
    extensions: [".jsx", ".js"], // 알아서 형식을 찾을 수 있도록 설정
  },

  entry: {
    // 입력
    app: "./client",
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, // js파일과 jsx파일에 (loader의)룰을 적용하겠다는 의미.
        loader: "babel-loader", // 최신 문법을 옛날 문법으로 변경.
        options: {
          // babel에 대한 설정
          // preset: plugin들의 모음
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR"], // browserslist
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, "dist"), // __dirname: 현재 폴더, 실제 경로
    filename: "app.js",
    publicPath: "/dist", // 가상 경로
  },

  devServer: {
    publicPath: "/dist",
    hot: true,
  },
};
