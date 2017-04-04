import {combineReducers} from 'redux';
import {localItem,removeLocalItem} from '../utils/myUtil';
const reducers = combineReducers({
    selectedTab: myTabBarReducer,//切换的Tab
    homeListObj: homeListReducer,//主页列表对象
    articleContent: articleContentReducer, //文章内容
    loginObj: loginReducer, //登录验证
    favouriteList:favArticleReducer
});

//处理文章内容的Reducer(全局总是只有一篇文章详细展示);
function articleContentReducer(articleContent = null, action) {
    switch (action.type) {
        case 'FETCH_REQUEST_ARTICLE':
            return null;
        case 'FETCH_SUCCESS_ARTICLE':
            return articleContent = action.payload.data;
        case 'FETCH_SUCCESS_ADD_FAVOURITE':
            articleContent.is_collect=!articleContent.is_collect;
            return articleContent;
        case 'FETCH_SUCCESS_REMOVE_FAVOURITE':
            articleContent.is_collect=!articleContent.is_collect;
            return articleContent;
        default :
            return articleContent;
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
                pageIndex:++pageIndex,
                scrollTop,
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
            return selectedTab;
    }
}

//收藏页数据处理
function favArticleReducer(favouriteList=[],action) {
    switch (action.type){
        case 'FETCH_REQUEST_FAVOURITELIST':
            return favouriteList;
        case 'FETCH_SUCCESS_FAVOURITELIST':
            return action.payload.data;
        default:
            return favouriteList;
    }
}

//处理登录状态的Reducer
function loginReducer({isLogin, isLogining, accesstoken, successObj}={
    isLogin: false,
    isLogining: false,
    accesstoken: '',
    successObj: null
}, action) {

    switch (action.type) {
        case 'FETCH_REQUEST_LOGIN':
            removeLocalItem('accesstoken');
            return {
                isLogin,
                isLogining: true,
                accesstoken: action.param.accesstoken,
                successObj
            };
        case 'FETCH_SUCCESS_LOGIN':
            localItem('accesstoken',accesstoken);
            return {
                isLogin: true,
                isLogining: false,
                accesstoken,
                successObj: action.payload
            }
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