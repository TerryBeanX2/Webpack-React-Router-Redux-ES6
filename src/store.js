import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import config from './config/config';
import doFetch from './commonActions/fetch';
import {localItem} from './utils/myUtil';
//组合之后的reducer
import reducer from './reducers/reducers';

//全局唯一的store,挂在window上方便控制台查看
window.store = createStore(
    reducer,
    applyMiddleware(thunk)
);

//初次加载验证登录
window.store.dispatch(doFetch('accesstoken', 'post', {accesstoken: localItem('accesstoken')}, '_LOGIN'));


export default window.store;