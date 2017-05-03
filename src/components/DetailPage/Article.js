import React from 'react';
import './Article.scss';
import {connect} from 'react-redux';
import doFetch from '../../commonActions/fetch';
import {MyNavBarRedux} from '../../components/common/NavBar';
import {articleType} from '../../components/Home/HomeList';
import {formatDate} from '../../utils/myUtil';
import Loading from '../common/Loading';
import config from '../../config/config'
const widthRem = document.documentElement.clientWidth / parseInt(document.documentElement.style.fontSize);


const defineClickFunc = (history,loginObj, isCollect, add, remove,id)=> {
    if (!loginObj.isLogin) {
        history.push('/Login')
    }
    const json = {accesstoken:loginObj.accesstoken,topic_id :id};
    return isCollect ? remove(json) :add(json)
};


class Article extends React.Component {
    //渲染数据
    componentDidMount() {
        this.props.getArticleContent(`topic/${this.props.match.params.id.slice(1)}`, 'get', {accesstoken: this.props.loginObj.accesstoken});
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.isFetching&&!nextProps.isFetching;
    }
    render() {
        const {isFetching,data, getArticleContent, loginObj, addFavourite, removeFavourite,history} = this.props;
        if (isFetching||!data.id){
            console.log('渲染Loading')
            return (<div><MyNavBarRedux page="DetailPage" titleName="文章详情"/><Loading/></div>);
        }
        const replyList = data.replies.map((reply)=>(
            <div className="replyItem" data-flex="main:left cross:top" key={reply.id}
                 style={{width: widthRem - 0.4 + 'rem', padding: '0.2rem'}}>
                <img className="replyAvatar" src={reply.author.avatar_url}/>
                <div className="replyAuthor">{reply.author.loginname}:</div>
                <div className="replyContent" dangerouslySetInnerHTML={{__html: reply.content}}></div>
                <div className="todoToReply" data-flex="dir:top main:top cross:center">
                    <div className="like">喜欢</div>
                    <div className="toReply">回复</div>
                </div>
            </div>
        ))
        console.log('Article页面渲染了一次');
        return (
            <div className="detailPage">
                <MyNavBarRedux history={history} page="DetailPage" titleName="文章详情"/>
                <div className="author">
                    <img className="avatar" src={data.author.avatar_url}/>
                    <span className="loginName">{data.author.loginname}</span>
                    {data.tab?(<span className="infoSpan">{articleType[data.tab]}</span>):('')}
                    {data.good ? (<span className="infoSpan good">精华</span>) : ('')}
                    {data.top ? (<span className="infoSpan good">置顶</span>) : ('')}
                    <div className="rightInfo">
                        <span className="infoSpan">发布时间：{()=>formatDate(data.create_at)}</span>
                        <span className="infoSpan">查看：{data.visit_count}</span>
                        <span className="infoSpan">回复：{data.reply_count}</span>
                    </div>
                </div>
                <div style={{width: widthRem - 0.4 + 'rem', padding: '0.2rem'}} className="title">{data.title}</div>
                <div className="collect" onClick={()=>defineClickFunc(history,loginObj,data.is_collect,addFavourite,removeFavourite,data.id)}
                     style={{background: data.is_collect ? 'rgba(6, 8, 9, 0.5)' : 'green'}}>{data.is_collect ? '取消收藏' : '收藏'}</div>
                <div className="markdown-body" style={{
                    width: widthRem - 0.2 + 'rem',
                    padding: '0.3rem 0.1rem'
                }} dangerouslySetInnerHTML={{__html: data.content}}></div>
                <div style={{width: widthRem - 0.4 + 'rem', padding: '0.2rem'}} className="title">回复({data.reply_count})：</div>
                <div className="replyList">{replyList}</div>
            </div>
        )
    }
}

const ArticleRedux = connect((state)=>({
    data: state.articleContent,
    loginObj: state.loginObj,
    isFetching:state.isFetching.isFetching
}), (dispatch)=>({
    getArticleContent: (url, type, json)=> {
        dispatch(doFetch(url, type, json, '_ARTICLE'))
    },
    addFavourite: (json)=> {
        dispatch(doFetch('topic_collect/collect', 'post', json, '_ADD_FAVOURITE'));
    },
    removeFavourite: (json)=> {
        dispatch(doFetch('topic_collect/de_collect', 'post', json, '_REMOVE_FAVOURITE'));
    }
}))(Article);

export default ArticleRedux;


