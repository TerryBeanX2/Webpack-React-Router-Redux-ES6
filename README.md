# webpack2+react+react-router+react-redux+ES6+antd-mobile版本的Cnode

  妈妈前最近查出患了癌症，还好是早期，手术也很顺利。现在唯一的心愿就是妈妈早日康复。<br/>
  (4.17手术拆线，朝着痊愈稳步前进)<br>
  (4.26术后化疗第一天，白疗方案，一切顺利)<br>
  清明节，足不出户，北京的外卖养了我三天，我写了个CNode的react版本。<br/>
  二话不说，先上个作品地址，来扫码：<br/>
  
  ![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/erweima1.png)<br/>
  静态服务器是node搭的，PM2开启守护，不用再担心挂掉了...
  
#### 2017.5.4完成react-router版本4的升级，以及使用browserHistrory的线上部署。
* 本地开发调试请在config里切回hash路由，不然刷新会有问题，线上部署browserHistory需要服务器配合，我也把配合逻辑的node代码上传，文件名server.js。
* 微信内需要用域名，我没弄域名，所以线上还是改回使用hash路由以便观看。

#### 2017.4.27给自己立两个flag，不定期会更新：
* 改造hashHistory为browserHistory，包括服务端都自己来配置。
* 把react-router升级到4版本。
#### 2017.4.6更新思维导图。
  
  首页加载还是有一些可以优化的地儿<b>耐心等一会儿吧~！</b><br/>
  首先感谢CNode提供的API，以及react china众多例子，特别是精品区置顶第二个帖子狼族小狈带来的[例子](http://react-china.org/t/webpack-react-react-router-redux-less-flex-css-es6-react-cnode/6332),在核心逻辑上，我完全按照自己的思路实现。<br/>
  
使用的技术栈：
----------------

  <b>webpack</b>：更新到2版本，网上目前大多数webpack-react教程都是1版本的配置写法。<br/>
  <b>react</b>：谁用谁知道。<br/>
  <b>react-router</b>：激进的我一边查阅4版本的英文文档一边做demo，发现改动太大，国内连issue几乎都没有，所以我鸟悄的退回到3版本使用。<br/>
  <b>react-redux</b>：挑战所在，因为我从事前端近三年，本身的业务却很少接触react，加上redux，这次对我来说是开发思维的变革。<br/>
  <b>ES6</b>：以前自己学JAVA的时候就喜欢Class的写法，这次每写一个组件都爽咩哈哈。<br/>
  <b>antd-mobile</b>：UI样式，阿里提供的antd的移动端实现，完美契合react，好用，好看。<br/>
  
几点心得：
--------------
  
  1、对常用jQuery/Zepto这类类库开发的开发者来说，react开发体验要好太多，webpack的强大功能使开发专注于代码，不用再考虑babel转好了ES6还要确定目录、sass还要用考拉或者filewatcher来处理、代码复用到底写在哪里才好...等问题。<br/>
  
  2、众多的贡献者，超高的社区活跃度，数不清的插件(这次项目中使用了许多，实在是太好用)，react+webpack+ES6的技术栈可以给开发者长期浸淫的信心。<br/>
  
  3、redux架构给我的体验还不错，多亏阮一峰老师的[简明教程](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)，这个教程是三部的，都需要认真看。这些教程让我可以快速掌握一些核心的使用方式以及提早要避免的坑，对应redux，我的项目结构是经过一番考究才定下来的。<br/>
  
  4、虽然react-redux建议UI不要带有任何自己的state，但实际业务中，灵活的使用UI本身的state是非常有利于开发的，不要为了使用redux而使用redux。另外，开发人员不是特多的话，reducer写在一个js里也不错，出了逻辑问题直接定位到这。action的type命名遵循一定规律，会给后期开发带来想不到的福利，比如这次的异步action‘fetch’，开发后期发现异步带来的问题有很多，需要一个全局控制，这时reducer配合正则表达式+遵循了一定规律的命名，很简单就实现了想要的。<br/>
  
  5、虽然可以很快就实现初级的项目，开发过程中，完全不考虑操作DOM的体验虽然好，但也带来了许多可能的不必要的重复渲染，react配合redux非常需要注意性能，reducer处理不好，经常会重复渲染，理解react的运作方式很重要，零活运用shouldComponentUpdate来使你的页面性能达到最好，本身这就是一个挑战，再加上redux的参与...经过一番努力，我才使所有的页面都禁止了不必要的渲染，这个优化我体现在了控制台里，你可以查看每页的渲染情况。<br/>
  
  6、实现回到长列表的上次滚动位置，着实耗费了我不少时间，想了许多种实现方式，最终通过ListView的initialListSize属性配合缓存，实现了几乎媲美原生的回退到上次列表位置的效果。还有antd的ListView[重复触发又没有详细明确的解答的onEndReached事件问题](https://github.com/ant-design/ant-design-mobile/issues/520#issuecomment-263510596)，最终通过对异步的控制以及在render中做了一些非常规处理才解决。<br/>
  
  7、长列表的滚动延续动画无法控制，导致模仿iOS回到顶部的功能总是有缺陷，我有很多想法，比如：屏蔽掉原生事件，Touch.js之类的组件模拟。也可以单独弄个回到顶部的按钮出来，那样点击一次就会让滚动停下，第二次就可以回到顶部了(但是那样长得就不像原生的了)。 网上有很多长列表优化的文章，这个也是作为H5发开着需要着重研究的一个点，需要更深入的研究。也许在RN里能有更好的表现？所以，呃，研究RN势在必行。
  
  8、老生常谈的首屏加载问题，在Gzip的淫威下，1.6M的bundle压缩后只有300多k，然后，webpack+react-router还能实现按需加载，在硬件不断进步的今天，越来越不是问题了，这已经是现实了，就像两年前我们还在担心有的老板想兼容IE6，如今淘宝都只支持IE9+了，我的梦想是，没有IE，哈哈哈哈。Gzip我是用webpack-dev-server开的，包括proxy也是用它开的，在开发角度来说，比ngnix还方便。以前用ngnix处理开发中的跨域，还要另外去动手(懒得不要不要的)。
  
  9、虽然英文水平可以勉强看英文文档，但无法像看中文文档那样自如浏览，一定程度上影响跟随国外优秀新版本技术的脚步，下一步也要强迫自己多贴近英文。<br/>
  
  10、因为接触的越多，觉得需要学习的越多，内心也是五味杂陈的，我还没[女朋友](http://baike.baidu.com/link?url=QkECFyQ2w8OLmHs1e81YQV3LjZsUj8QARRTYcGME_YjQMhDZkKcRTfl3G7S7darH9WlU0-S3-2EjjbjRMSK2JwG1tcoDrbyU1p8YYs-jgb0xmVD29gncZ_5LX3UlH4eJ)呢。。。
  
作品实现的功能：
----------------

    1、首页：上拉无限加载(目前没做下拉刷新)，文章分类显示，点击条目进入文章详情，实现回退/Tab切换后，回到记录的滚动位置。
    2、文章详情页：显示文章详情和评论，登录情况下可以收藏/取消收藏，提供回退功能。(评论点赞和回复功能暂时没有实现)
    3、收藏页：显示已经收藏的文章，点击条目进入文章详情。
    4、消息页：(目前没做跟消息有关的功能)。
    5、我的：只提供了显示头像和退出功能。
    6、登录：实现了登录功能，没有登录的情况下，进入无权限的页面会跳转到登录页面。
    *、其他：首页长列表Iphone体验良好(回到顶部是缺陷)，没有考虑android的情况，比如按需进行body滚动等等。
    *、后期规划：不定期完善剩余功能，也有可能转战RN，下一步打算做一个思维导图，梳理一下架构思路。
    *、已知问题1：模仿iOS回到顶部功能没实现，也没做按钮式的回到顶部；
    *、已知问题2：移动4G情况下，CNode的API好像被墙了，导致数据加载不出来。
    *、已知问题3：频繁的联网/断网后，可能会出现Bug，毕竟不是线上产品，暂时不处理。
    
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
  快速实现本地dev模式运行我的源码，三步走起：<br/>
  
      1、选择合适的空文件夹，打开你的git bash输入 git clone git@github.com:TerryBeanX2/Webpack-React-Router-Redux-ES6.git 克隆我的仓库；
      2、命令行 npm install ；
      3、命令行 npm run dev ，浏览器访问 localhost:8888 ，F12进入移动开发模式查看 ；
      *、如果出现问题，尝试cnpm淘宝镜像安装。
  
  
2017.4.6更新实际项目思维导图
--------------
#### 其实就是React+React-Router+React-Redux的架构流程图实例版
----------
首先，我们来说为什么要用Redux<br/>

![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/why-redux.jpg)<br/>

下面上本项目思维导图(看不清就点图->下个页面点那个Download按钮)<br/>

![img](https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6/blob/imgBranch/egImg/react-redux-real.jpg)<br/>

  
希望得到你的STAR
--------------
这次很用心的做了一个作品，希望得到同仁们的肯定，不要吝啬你们的<b>Star</b> ~怎么还不点~ 一定要点呀
