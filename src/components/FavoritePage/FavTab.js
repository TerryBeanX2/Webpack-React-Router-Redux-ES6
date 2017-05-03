import React from 'react';
import {MyTabBarRedux} from '../common/TabBar';
import {MyNavBarRedux} from '../common/NavBar';
import {Button, Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import Loading from '../common/Loading';
import doFetch from '../../commonActions/fetch';
import './FavTab.scss';


const data = Array.from(new Array(19)).map((_val, i) => ({
    icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
    text: `名字${i}`,
}));


class FavPage extends React.Component {

    componentDidMount() {
        //如果是跳转到此页面并且是登录状态，加载一次数据
        if (this.props.loginObj.successObj) {
            this.props.getFav(this.props.loginObj.successObj.loginname)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        //如果是刷新页面时就在此页面，加载一次数据
        if(this.props.loginObj.isLogining&&!nextProps.loginObj.isLogining){
            if (nextProps.loginObj.successObj) {
                this.props.getFav(nextProps.loginObj.successObj.loginname)
            }
        }
        return nextProps.favList.length!=0&&this.props.favList.length!=nextProps.favList.length;
    }

    render() {
        const {loginObj, favList,history} = this.props;
        const data = favList.map((item,index)=>({
            icon:item.author.avatar_url,
            text:item.title,
            id:item.id
        }))
        if (!loginObj.isLogin) {
            console.log('favourite页面未登录状态渲染了一次');
            return (
                <div>
                    <MyNavBarRedux history={history} page="favTab" titleName="收藏"/>
                    <Button className="toLoginPage" onClick={()=>history.push('/Login')}>去登录</Button>
                    <MyTabBarRedux history={history} page="favTab"/>
                </div>
            )
        }
        else if(loginObj.isLogining||!loginObj.successObj||favList.length==0){
            console.log('渲染Loading');
            return(
                <div>
                    <MyNavBarRedux history={history} page="favTab" titleName="收藏"/>
                    <Loading/>
                    <MyTabBarRedux history={history} page="favTab"/>
                </div>
            )
        }else {
            console.log('favourite页面登录状态渲染了一次');
            return (
                <div>
                    <MyNavBarRedux history={history} page="favTab" titleName="收藏"/>
                    <Grid data={data} columnNum={2} onClick={(_el, index) => history.push(`/article/:${_el.id}`)} />
                    <MyTabBarRedux history={history} page="favTab"/>
                </div>
            )
        }
    }
}

const FavPageRedux = connect((state)=>({
    loginObj: state.loginObj,
    favList: state.favouriteList
}), (dispatch)=>({
    getFav: (loginName)=>dispatch(doFetch(`topic_collect/${loginName}`, 'get', {}, '_FAVOURITELIST'))
}))(FavPage);

export default FavPageRedux;

