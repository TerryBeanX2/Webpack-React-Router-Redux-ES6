import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import doFetch from './actions/fetch';
//组合之后的reducer
import reducer from './reducers/reducers';
//全局唯一的store
let store = createStore(
    reducer,
    applyMiddleware(thunk)
);

//首屏初始数据
store.dispatch(doFetch('http://cnodejs.org/api/v1/topics'));

export default store;