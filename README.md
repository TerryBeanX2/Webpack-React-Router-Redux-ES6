# Webpack-React-Router-Redux-ES6
webpack2+react+react-router+react-redux+ES6版本的Cnode

  清明节，我没有出门玩（我啥节也不出门），写了个CNode的DEMO。<br/>
  二话不说，先上个DEMO地址，http://118.89.219.87/react-terry<br/>
  或者扫码：<br/>
  ![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/erweima.png)<br/>
  贼慢的一个服务器，Gzip也开不起来，多等一会儿吧~<br/>
  首先感谢CNode提供的API，以及react china众多例子，特别是精品区置顶第二个帖子狼族小狈带来的想法。<br/>
  
  使用的技术栈：<br/>
  <b>webpack</b>：更新到2版本，网上目前大多数webpack-react教程都是1版本的配置写法。<br/>
  <b>react</b>：谁用谁知道。<br/>
  <b>react-router</b>：激进的我一边查阅4版本的英文文档一边做demo，发现改动太大，国内连issue几乎都没有，所以我鸟悄的退回到3版本使用。<br/>
  <b>react-redux</b>：挑战所在，因为我从事前端近三年，本身的业务却很少接触react，加上redux，这次对我来说是开发思维的变革。<br/>
  <b>ES6</b>：以前自己学JAVA的时候就喜欢Class的写法，这次每写一个组件都爽咩哈哈。<br/>
  <b>antd-mobile</b>：UI样式，阿里提供的antd的移动端实现，完美契合react，好用，好看。<br/>
  
  DEMO实现的功能：<br/>
  1、首页：上拉无限加载，文章分类显示，点击条目进入文章详情，实现回退/Tab切换后，回到记录的滚动位置。<br/>
  2、文章详情页：显示文章详情和评论，登录情况下可以收藏，提供回退功能。(评论点赞和回复功能暂时没有实现)<br/>
  3、收藏页：显示已经收藏的文章，点击条目进入文章详情。<br/>
  4、消息页：(暂时没有实现消息功能)。<br/>
  5、我的：只提供了显示头像和退出功能。<br/>
  6、登录：实现了登录功能，没有登录的情况下，进入无权限的页面会跳转到登录页面。<br/>
  7、其他：Iphone体验良好，没有考虑android的情况，比如按需进行body滚动等等。<br/>
  
  
  ![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/IMG_1595.PNG)
  ![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/IMG_1596.PNG)
  ![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/IMG_1597.PNG)
  ![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/IMG_1598.PNG)
  ![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/IMG_1599.PNG)
  ![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/IMG_1600.PNG)
  ![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/IMG_1602.PNG)
  ![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/IMG_1603.PNG)
  ![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/IMG_1604.PNG)
  
  在此开放源码，提供给有兴趣一起研究的coder们，主要部分我都进行了注释。<br/>
  快速实现本地dev模式运行我的源码三步走：<br/>
  1、打开你的git输入 git@github.com:TerryBeanX2/Webpack-React-Router-Redux-ES6.git 克隆我的仓库；<br/>
  2、命令行 npm install <br/>
  3、命令行 npm run dev ，浏览器访问 localhost:8888 ，F12进入移动开发模式查看<br/>
  
