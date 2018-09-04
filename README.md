# 一堑
## View 层

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

### Lints and fixes files
```
npm run lint
```

### 开发笔记

1. Vue router 开启 HTML5 历史模式( `mode: 'history'` )和多页面应用 multi-page 不要同时使用

2. 移动端禁止用户选择文本，除了在 CSS 中设置 `user-select: none` 以外，还需要在对应容器上禁用 onselectstart 事件，为 onselectstart 注册一个 `return false;` 的回调，看起来像这样：`onselectstart="return false;"`
