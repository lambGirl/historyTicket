export default {
  hashHistory: true,
  plugins: [
    'umi-plugin-dva',
    'umi-plugin-polyfill',
  ],
  hd:false, //放大了字体大小，图片没有bian
  "proxy": {        //配置代理
      "/api": {
          //"target": "http://jsonplaceholder.typicode.com/",
          "target": "http://localhost:5000/",
          "changeOrigin": true,
          "pathRewrite": { "^/api" : "/api" }
      },
  }
}
