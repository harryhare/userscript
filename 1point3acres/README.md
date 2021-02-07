# 一亩三分地 反 Adblock 检测


## 功能

在开启Adblock 插件后，浏览网站会出现烦人的弹窗，这个插件会抑制弹窗出现

## 其他

* 开始想着通过 了解Adblock 的实现，可以想到阻止弹窗的办法，于是看了这两篇

  - [网页检测AdBlock的6种方法](https://www.chinaz.com/web/2015/0209/383638.shtml)
  
  - [知乎用什么黑科技检测到我的浏览器装了adblock插件？](https://www.zhihu.com/question/56574733?sort=created)
  但是并没有发现切入点
  
* 然后发现，那个弹窗是js 动态加上的，然后决定直接监听组建改变

  - [Mutation Observer API](https://wangdoc.com/javascript/dom/mutationobserver.html)