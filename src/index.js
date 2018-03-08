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

