import {IndexRoute, Router, Route, hashHistory} from 'react-router';
import {render} from 'react-dom';
import React from 'react';
import 'normalize.css';
import './index.scss';
import 'flex.css/dist/data-flex.css';
import {HomeListRedux} from './components/Home/HomeList';
import FastClick from './utils/fastclick';
import {MyTabBarRedux} from './components/common/TabBar';
import {MyNavBarRedux} from './components/common/NavBar'
import {Provider} from 'react-redux';
FastClick.attach(document.body);
import store from './store'
// import ArticleRedux from './components/DetailPage/Article'
class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}


render(
    (
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={HomeListRedux}/>
                    <Route path="/article/:id"
                           getComponent={
                               (nextState, callback)=> {
                                   require.ensure([], (require)=> {
                                       callback(null, require("./components/DetailPage/Article").default)
                                   }, "Article")
                               }}
                    />
                    <Route path="/Fav"
                           getComponent={
                               (nextState, callback)=> {
                                   require.ensure([], (require)=> {
                                       callback(null, require("./components/FavoritePage/FavTab").default)
                                   }, "Fav")
                               }}
                    />
                    <Route path="/Message"
                           getComponent={
                               (nextState, callback)=> {
                                   require.ensure([], (require)=> {
                                       callback(null, require("./components/MessagePage/MessageTab").default)
                                   }, "Message")
                               }}
                    />
                    <Route path="/My"
                           getComponent={
                               (nextState, callback)=> {
                                   require.ensure([], (require)=> {
                                       callback(null, require("./components/MyPage/MyTab").default)
                                   }, "My")
                               }}
                    />
                    <Route path="/Login"
                           getComponent={
                               (nextState, callback)=> {
                                   require.ensure([], (require)=> {
                                       callback(null, require("./components/common/Login").default)
                                   }, "Login")
                               }}
                    />
                </Route>
            </Router>
        </Provider>
    ), document.getElementById('app')
);