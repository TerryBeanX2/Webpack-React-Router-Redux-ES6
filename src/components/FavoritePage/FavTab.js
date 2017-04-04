import React from 'react';
import {hashHistory} from 'react-router';
import {MyTabBarRedux} from '../common/TabBar';
import {MyNavBarRedux} from '../common/NavBar';
import {Button, Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import doFetch from '../../commonActions/fetch';
import './FavTab.scss';


const data = Array.from(new Array(19)).map((_val, i) => ({
    icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
    text: `名字${i}`,
}));


class FavPage extends React.Component {

    componentDidMount() {
        if (this.props.loginObj.successObj) {
            this.props.getFav(this.props.loginObj.successObj.loginname)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.favList.length!=0&&this.props.favList.length!=nextProps.favList.length;
    }

    render() {
        const {loginObj, favList} = this.props;
        const data = favList.map((item,index)=>({
            icon:item.author.avatar_url,
            text:item.title,
            id:item.id
        }))
        if (!loginObj.isLogin) {
            return (
                <div>
                    <MyNavBarRedux page="favTab" titleName="收藏"/>
                    <Button className="toLoginPage" onClick={()=>hashHistory.push('/Login')}>去登录</Button>
                    <MyTabBarRedux page="favTab"/>
                </div>
            )
        } else {
            return (
                <div>
                    <MyNavBarRedux page="favTab" titleName="收藏"/>
                    <Grid data={data} columnNum={2} onClick={(_el, index) => hashHistory.push(`/article/:${_el.id}`)} />
                    <MyTabBarRedux page="favTab"/>
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

