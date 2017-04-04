import {combineReducers} from 'redux';
import {localItem, removeLocalItem} from '../utils/myUtil';
const reducers = combineReducers({
    selectedTab: myTabBarReducer,//切换的Tab
    homeListObj: homeListReducer,//主页列表对象
    articleContent: articleContentReducer, //文章内容
    loginObj: loginReducer, //登录验证
    favouriteList: favArticleReducer,//收藏列表
    isFetching: fetchingReducer //全局异步fetching管理
});


//全局异步fetchingReduce
function fetchingReducer({isFetching, fetchingNum} = {isFetching: false, fetchingNum: 0}, action) {
    switch (action.type) {
        case ((action.type.match(/FETCH_REQUEST_.*/) || [])[0]):
            return {
                isFetching: true,
                fetchingNum: fetchingNum + 1
            };
        case ((action.type.match(/(FETCH_SUCCESS_|FETCH_FAILED_).*/) || [])[0]):
            return (fetchingNum == 1) ?
            {
                isFetching: false,
                fetchingNum: fetchingNum - 1
            }
                :
            {
                isFetching:true,
                fetchingNum:fetchingNum - 1
            };
        default:
            return {isFetching, fetchingNum};
    }
}


//处理文章内容的Reducer(全局总是只有一篇文章详细展示);
function articleContentReducer(articleContent = {}, action) {
    // let newArticleContent = Object.assign({}, articleContent, { thingToChange });
    switch (action.type) {
        case 'PRESS_HOME_ITEM':
            return {};
        case 'FETCH_REQUEST_ARTICLE':
            return {};
        case 'FETCH_SUCCESS_ARTICLE':
            return action.payload.data;
        case 'FETCH_SUCCESS_ADD_FAVOURITE':
            return Object.assign({}, articleContent, {is_collect: !articleContent.is_collect});
        case 'FETCH_SUCCESS_REMOVE_FAVOURITE':
            return Object.assign({}, articleContent, {is_collect: !articleContent.is_collect});
        default :
            return Object.assign({}, articleContent);
    }
}

//全局跟HomeList有关的逻辑Reducer
function homeListReducer({homeDataList, isFetching, pageIndex, scrollTop, articleType}={
    homeDataList: [],
    isFetching: false,
    pageIndex: 1,
    scrollTop: 0,
    articleType: 'all'
}, action) {
    switch (action.type) {
        case 'FETCH_REQUEST_TOPICS':
            return {
                homeDataList: homeDataList,
                isFetching: true,
                pageIndex: pageIndex,
                scrollTop: scrollTop,
                articleType
            };
        case 'FETCH_SUCCESS_TOPICS':
            return {
                homeDataList: homeDataList.concat(action.payload.data),
                isFetching: false,
                pageIndex: pageIndex+ 1,
                scrollTop,
                articleType
            };
        case 'FETCH_FAILED_TOPICS':
            return {
                homeDataList: homeDataList,
                isFetching: false,
                pageIndex: pageIndex - 1,
                scrollTop: scrollTop,
                articleType
            };
        case 'CHANGE_ARTICLE_TYPE':
            return {
                homeDataList: [],
                isFetching: false,
                pageIndex: 1,
                scrollTop: 0,
                articleType: action.payload.tab
            };
        default:
            return {
                homeDataList,
                isFetching,
                pageIndex,
                scrollTop,
                articleType
            };
    }
}

//处理点击Tab后全局数据变化的Reducer 暂时只是个样子
function myTabBarReducer(selectedTab = 'indexTab', action) {
    switch (action.type) {
        case 'CHANGE_TAB':
            return action.payload.selectedTab;
        default:
            return 'indexTab';
    }
}

//收藏页数据处理
function favArticleReducer(favouriteList = [], action) {
    switch (action.type) {
        case 'FETCH_REQUEST_FAVOURITELIST':
            return [...favouriteList];
        case 'FETCH_SUCCESS_FAVOURITELIST':
            return action.payload.data;
        default:
            return [...favouriteList];
    }
}

//处理登录状态的Reducer
function loginReducer({isLogin, isLogining, accesstoken, successObj}={
    isLogin: true,
    isLogining: false,
    accesstoken: '',
    successObj: null
}, action) {

    switch (action.type) {
        case 'FETCH_REQUEST_LOGIN':
            return {
                isLogin: false,
                isLogining: true,
                accesstoken: action.param.accesstoken,
                successObj
            };
        case 'FETCH_SUCCESS_LOGIN':
            console.log('进入登录状态');
            localItem('accesstoken', action.param.accesstoken);
            return {
                isLogin: true,
                isLogining: false,
                accesstoken: action.param.accesstoken,
                successObj: action.payload
            };
        case 'FETCH_FAILED_LOGIN':
            console.log('进入无登录状态')
            removeLocalItem('accesstoken');
            return {
                isLogin: false,
                isLogining: false,
                accesstoken: '',
                successObj: null
            };
        case 'FETCH_REQUEST_LOGOUT':
            removeLocalItem('accesstoken');
            return {
                isLogin: false,
                isLogining: false,
                accesstoken: '',
                successObj: null
            };

        default :
            return {
                isLogin,
                isLogining,
                accesstoken,
                successObj
            };
    }
}

export default reducers;