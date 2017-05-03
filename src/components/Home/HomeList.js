import {ListView} from 'antd-mobile';
import React from 'react';
import {connect} from 'react-redux';
import './HomeList.scss';
import doFetch from '../../commonActions/fetch';
import {formatDate, localItem, removeLocalItem} from '../../utils/myUtil';
import config from '../../config/config'
import {MyTabBarRedux} from '../common/TabBar';
import {MyNavBarRedux} from '../common/NavBar'
import Loading from '../common/Loading';


const articleType = {
    'share': '分享',
    'ask': '问答',
    'job': '招聘',
    'good': '精华',
    'all': '全部'
};

//滚动到记录的位置方法
const returnTop = (con)=> {
    if (localItem('scrollPosition')) {
        //这个回滚对象我写的比较放飞自我，一般可以用类名获取等方法
        if (!con.refs.lv) return;
        try {
            con.refs.lv.refs.listview.refs.listviewscroll.refs.ScrollView.scrollTop = localItem('scrollPosition');
        }
        catch (e) {
            console.log(e)
        }
        removeLocalItem('scrollPosition');
    }
};
let timer = null;
let throttle = false;

class HomeList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            scrollTop: 0
        }
    }


    //返回记录滚动位置三件套1-针对切换Tab情况：
    componentDidMount() {
        // 首屏初始数据
        if (this.props.homeListObj.homeDataList.length == 0) {
            this.props.indexListNextPage('topics', 'get', {
                page: this.props.homeListObj.pageIndex,
                limit: config.pageSize,
                tab: this.props.homeListObj.articleType,
                mdrender: 'false'
            })
        }
        returnTop(this);
    }

    //返回记录滚动位置三件套2-针对浏览器返回按钮情况：
    componentDidUpdate() {
        returnTop(this);
    }

    //返回记录滚动位置三件套3-记录离开时的滚动条位置：
    componentWillUnmount() {
        localItem('scrollPosition', this.refs.lv.refs.listview.scrollProperties.offset);
    }

    //优化性能，避免多次重复渲染，只根据关心的数据选择是否渲染,这里比较随意
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.homeListObj.homeDataList.length !=nextProps.homeListObj.homeDataList.length)||(this.props.homeListObj.articleType != nextProps.homeListObj.articleType )|| (this.props.homeListObj.pageIndex != nextProps.homeListObj.pageIndex);
    }

    //ListView 稍微复杂 看不懂的去这里 https://mobile.ant.design/components/list-view/ 然后再去这里 http://www.jianshu.com/p/1293bb8ac969
    render() {
        const {history,isFetching, selectedTab, homeListObj, indexListNextPage,getNewArticleDetail} = this.props;
        //特殊处理一下判断fetching，一次渲染后只允许拿一次新数据
        let nowFetching = isFetching;
        if (!homeListObj.homeDataList.length) {
            console.log('渲染Loading页面')
            return (
                <div>
                    <MyNavBarRedux page="indexTab" titleName="首页"/>
                    <Loading/>
                    <MyTabBarRedux page="indexTab"/>
                </div>
            )
        }
        const separator = (rowID) => (
            <div key={`separator-${rowID}`} style={{
                backgroundColor: '#F5F5F9',
                height: '0.1rem',
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
            }}
            />
        );
        const row = (rowData, rowID) => {
            return (
                <div key={rowID} className="homeListItem" data-flex="main:left cross:center" onClick={()=> {
                    getNewArticleDetail();
                    history.push('article/:' + rowData.id)
                }}>
                    <div className="author">
                        <img className="authorAvatar" src={rowData.author.avatar_url}/>
                        <p className="authorName">{rowData.author.loginname}</p>
                    </div>
                    <div className="titleArea" data-flex="dir:top main:left cross:top">
                        <h4 className="itemTitle">{rowData.title}
                            <span className="infoSpan"
                                  style={rowData.top || rowData.good ? {backgroundColor: 'green', color: '#fff'} : {}}>
                            {rowData.top ? '置顶' : rowData.good ? '精华' : articleType[rowData.tab]}
                        </span>
                        </h4>
                        <p className="someInfo"><span className="infoSpan">查看：{rowData.visit_count}</span><span
                            className="infoSpan">回复：{rowData.reply_count}</span><span
                            className="infoSpan">最后回复：{formatDate(rowData.last_reply_at)}</span>
                        </p>
                    </div>
                </div>
            );
        };
        var main = (
            <div style={{margin: '0 auto', width: '100%'}}>
                <ListView ref="lv"
                          dataSource={this.state.dataSource.cloneWithRows(homeListObj.homeDataList)}
                          renderHeader={() => <div
                              style={{
                                  width: '100%',
                                  textAlign: 'center'
                              }}>{articleType[homeListObj.articleType]}</div>}
                          renderFooter={() => <div style={{padding: 30, textAlign: 'center'}}>
                              {homeListObj.isFetching ? '加载中...' : '加载完毕,继续滑也许还有？'}
                          </div>}
                          renderRow={(rowData, sectionId, rowId)=>row(rowData, rowId)}
                          renderSeparator={(sectionId, rowId)=>separator(rowId)}
                          className="homeList"
                          id="homeList"
                          style={{
                              height: (document.documentElement.clientHeight / parseInt(document.documentElement.style.fontSize)) - 1.9 + 'rem',
                              overflow: 'auto',
                              border: '1px solid #ddd'
                          }}
                          initialListSize={homeListObj.homeDataList.length}
                          pageSize={20}
                          scrollRenderAheadDistance={2000}
                          scrollEventThrottle={30}
                          onEndReached={(e)=> {
                              if (!e || nowFetching)return;
                              indexListNextPage('topics', 'get', {
                                  page: homeListObj.pageIndex,
                                  limit: config.pageSize,
                                  tab: homeListObj.articleType,
                                  mdrender: 'false'
                              });
                              nowFetching = true;
                          }}
                          onEndReachedThreshold={1000}
                />
            </div>
        );
        console.log('主页渲染了一次');
        return (
            <div>
                <MyNavBarRedux history={history} page="indexTab" titleName="首页"/>
                {main}
                <MyTabBarRedux history={history} page="indexTab"/>
            </div>
        );
    }
}


//关联redux
const HomeListRedux = connect((state)=>({
    homeListObj: state.homeListObj,
    selectedTab: state.selectedTab,
    isFetching: state.isFetching.isFetching
}), (dispatch)=>({
    indexListNextPage: (url, type, json,isFetching)=> {
        dispatch(doFetch(url, type, json, '_TOPICS'))
    },
    getNewArticleDetail:()=>{
        dispatch({type:'PRESS_HOME_ITEM'})
    }
}))(HomeList);

export {HomeListRedux, articleType}