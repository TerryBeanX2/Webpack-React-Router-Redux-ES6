import {IndexRoute, Router, Route, hashHistory} from 'react-router';
import {render} from 'react-dom';
import React from 'react';
import 'normalize.css';
import 'flex.css/dist/data-flex.css';
import './index.scss';
import Home from './components/Home/Home';
import FastClick from './utils/fastclick';
FastClick.attach(document.body);

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
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
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
    ), document.getElementById('app')
);