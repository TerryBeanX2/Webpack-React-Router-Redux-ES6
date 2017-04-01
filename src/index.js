import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import {render} from 'react-dom';
import React from 'react';
import 'normalize.css';
import './index.scss';
import {HomeRedux} from './components/Home/Home';
import FastClick from './utils/fastclick';
import {MyTabBarRedux} from './components/common/TabBar';
import {Provider} from 'react-redux';
FastClick.attach(document.body);
import store from './store'
class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
                <MyTabBarRedux/>
            </div>
        )
    }
}
render(
    (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={HomeRedux}/>
                    <Route path="/Main"
                           getComponent={
                               (nextState, callback)=> {
                                   require.ensure([], (require)=> {
                                       callback(null, require("./components/Main/Main").default)
                                   }, "Main")
                               }}
                    />
                    <Route path="/404"
                           getComponent={
                               (nextState, callback)=> {
                                   require.ensure([], (require)=> {
                                       callback(null, require("./components/404/PageNotFound").default)
                                   }, "PageNotFound")
                               }}
                    />
                </Route>
            </Router>
        </Provider>
    ), document.getElementById('app')
);