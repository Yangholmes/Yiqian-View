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

### TO DO
1. touch事件在低端机上体验很差，可能是频繁的事件触发导致的，做一下节流看看效果。

    测试之后发现并不是频繁事件导致的卡顿，而是touchmove事件压根没有响应。华为Mate20上并未出现，锤子M1很明显

2. 图片选择，quill默认的图片选择器在华为设备上有bug，具体表现为，打开图片管理器，路由至Wechat路径，图片显示为灰色，不可选择
