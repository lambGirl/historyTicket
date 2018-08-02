export default {
  hashHistory: true,
  es5ImcompatibleVersions: true,
  plugins: [
        ['umi-plugin-dva',{ immer: true }],
        'umi-plugin-polyfill',
        'umi-plugin-es5-imcompatible-versions',
  ],
  hd:false, //放大了字体大小，图片没有bian
  "proxy": {        //配置代理
      "/api": {
          //"target": "http://jsonplaceholder.typicode.com/",
          "target": "http://localhost:8001/",
          "changeOrigin": true,
          "pathRewrite": { "^/api" : "/api" }
      },

  }
}
