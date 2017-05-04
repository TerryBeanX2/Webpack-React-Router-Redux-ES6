import {Route, Link} from 'react-router-dom'
import {render} from 'react-dom';
import React from 'react';
import 'normalize.css';
import './index.scss';
import 'flex.css/dist/data-flex.css';
import {HomeListRedux} from './components/Home/HomeList';
import {Provider} from 'react-redux';
import FastClick from './utils/fastclick';
FastClick.attach(document.body);
import store from './store'
import ArticleRedux from './components/DetailPage/Article'
import MessageTabRedux from './components/MessagePage/MessageTab'
import FavRedux from './components/FavoritePage/FavTab'
import MyTabRedux from './components/MyPage/MyTab'
import Login from './components/common/Login'
import config from  './config/config'
const Router = config.Router;

import Bundle from './utils/bundle';

//按需加载工作配置(暂时关闭此功能，因为按需的模块都太小了,新手也请无视此区域的注释代码)============================================================================
// 异步引入
// import FavReduxContainer from 'bundle-loader?lazy&name=app-[name]!./components/FavoritePage/FavTab';
// import MessageTabReduxContainer from 'bundle-loader?lazy&name=app-[name]!./components/MessagePage/MessageTab';
// import MyTabContainer from 'bundle-loader?lazy&name=app-[name]!./components/MyPage/MyTab';
// import LoginContainer from 'bundle-loader?lazy&name=app-[name]!./components/common/Login';
// import ArticleReduxContainer from 'bundle-loader?lazy&name=app-[name]!./components/DetailPage/Article';
// class FavRedux extends React.Component {
//     render(){
//         return(
//             <Bundle load={FavReduxContainer}>
//                 {(FavRedux) => <FavRedux history={this.props.history} />}
//             </Bundle>
//         )
//     }
// }
//
// class MessageTabRedux extends React.Component {
//     render(){
//         return(
//             <Bundle load={MessageTabReduxContainer}>
//                 {(MessageTabRedux) => <MessageTabRedux history={this.props.history} />}
//             </Bundle>
//         )
//     }
// }
//
// class MyTabRedux extends React.Component {
//     render(){
//         return(
//             <Bundle load={MyTabContainer}>
//                 {(MyTabRedux) => <MyTabRedux history={this.props.history} />}
//             </Bundle>
//         )
//     }
// }
//
// class Login extends React.Component {
//     render(){
//         return(
//             <Bundle load={LoginContainer}>
//                 {(Login) => <Login history={this.props.history} />}
//             </Bundle>
//         )
//     }
// }
//文章页按需加载会引起match问题，就算你想按需加载，也请不要按需加载文章页。
// class ArticleRedux extends React.Component {
//     render(){
//         return(
//             <Bundle load={ArticleReduxContainer}>
//                 {(ArticleRedux) => <ArticleRedux history={this.props.history} match={this.props.match} />}
//             </Bundle>
//         )
//     }
// }
//按需加载工作配置完毕============================================================================

render(
    (
        <Provider store={store}>
            {/*如果路径不对，请修改basename为你想要的，或者直接删除basename属性*/}
            {/*<Router basename="/react-t">*/}
            <Router>
                <div>
                    <Route exact path="/" component={HomeListRedux}/>
                    <Route path="/article/:id" component={ArticleRedux}/>
                    <Route path="/Fav" component={FavRedux}/>
                    <Route path="/Message" component={MessageTabRedux}/>
                    <Route path="/My" component={MyTabRedux}/>
                    <Route path="/Login" component={Login}/>
                </div>
            </Router>
        </Provider>
    ), document.getElementById('app')
);

