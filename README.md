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
  
  几点心得：<br/>
  1、对常用jQuery/Zepto这类类库开发的开发者来说，react开发体验要好太多，webpack的强大功能使开发专注于代码，不用再考虑babel转好了ES6还要确定目录、sass还要用考拉或者filewatcher来处理、代码复用到底写在哪里才好...等问题。<br/>
  
  2、众多的贡献者，超高的社区活跃度，输不清的插件(实在是太好用)，react+webpack+ES6的技术栈可以给开发者长期浸淫的信心。<br/>
  
  3、redux架构给我的体验还不错，多亏阮一峰老师的简明教程，让我可以快速掌握一些核心的使用方式，对应redux，我的项目结构是经过一番考究才定下来的。<br/>
  
  4、虽然react-redux建议UI不要带有任何自己的state，但实际业务中，灵活的使用UI自己的state是非常有利于开发的，不要为了使用redux而使用redux。<br/>
  
  5、虽然可以很快就实现初级的项目，但react配合redux非常需要注意性能，reducer处理不好，经常会重复渲染，经过一番努力，我才使所有的页面都禁止了不必要的渲染，这个优化我体现在了控制台里，你可以查看每页的渲染情况。<br/>
  
  6、实现回到长列表的上次滚动位置，着实耗费了我不少时间，包括antd的ListView重复触发endReached事件问题，最终都解决了。<br/>
  
  7、开发过程中，完全不考虑操作DOM的体验虽然好，但也带来了许多可能的不必要的重复渲染，理解react的运作方式很重要，零活运用shouldComponentUpdate来使你的页面性能达到最好，本身这就是一个挑战，再加上redux的参与，对开发者的大局观要求不低。<br/>
  
  8、长列表的滚动无法控制，导致回到顶部功能总是有缺陷，我有很多想法，希望将来能实践，比如：屏蔽掉原生事件，自己用JS模拟，或者用translate模拟。
  网上有很多长列表优化的文章，这个也是作为H5发开着需要着重研究的一个点，需要更深入的研究。也许在RN里能有更好的表现？所以，呃，研究RN势在必行。
  
  9、虽然英文水平可以勉强看英文文档，但无法像看中文文档那样自如浏览，一定程度上影响跟随国外优秀新版本技术的脚步，下一步也要强迫自己多贴近英文。<br/>
  
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
  快速实现本地dev模式运行我的源码，三步走起：<br/>
  
      1、打开你的git输入 git@github.com:TerryBeanX2/Webpack-React-Router-Redux-ES6.git 克隆我的仓库；<br/>
      2、命令行 npm install <br/>
      3、命令行 npm run dev ，浏览器访问 localhost:8888 ，F12进入移动开发模式查看<br/>
  
