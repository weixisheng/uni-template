# uni-template
uni-app 自定义模板，适用于cli创建的项目。[模板地址](https://gitee.com/hishion.com/uni-template)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 使用须知
项目中用到了两种请求封装方式，任选其一：
1. 全局挂载到Vue的api，直接在```src/api/index.js```中根据模板添加接口，后续在页面中直接```this.$api.xxx```调用，这种方式需要在```main.js```引入。
2. 需要手动引入接口（支持二次封装全局挂载，```Vue.use```），基于flyio请求库优化。
