import React from 'react';
import {MyTabBarRedux} from '../common/TabBar';
import {MyNavBarRedux} from '../common/NavBar';
import {Button} from 'antd-mobile';
import doFetch from '../../commonActions/fetch';
import Loading from '../common/Loading';
import './MyTab.scss';
import {connect} from 'react-redux';
class MyTab extends React.Component {


    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.props.loginObj)!=JSON.stringify(nextProps.loginObj)
    }

    render() {
        const {loginObj,logOut,history} = this.props;
        if(!loginObj.isLogin){
            console.log('My页面未登录状态渲染了一次');
            return(
                <div>
                    <MyNavBarRedux history={history} page="myTab" titleName="我的"/>
                    <Button className="toLoginPage" onClick={()=>history.push('/Login')}>去登录</Button>
                    <MyTabBarRedux history={history} page="myTab"/>
                </div>
            )
        }else if(loginObj.isLogining||!loginObj.successObj){
            return(
                <div>
                    <MyNavBarRedux history={history} page="myTab" titleName="我的"/>
                    <Loading/>
                    <MyTabBarRedux history={history} page="myTab"/>
                </div>
            )
        }
        else{
            console.log('My页面登录状态渲染了一次');
            return (
                <div>
                    <MyNavBarRedux history={history} page="myTab" titleName="我的"/>
                    <img className="myAvatar" src={loginObj.successObj.avatar_url} />
                    <Button id="logOutBtn" onClick={()=>logOut()} className="toLoginPage">退出</Button>
                    <MyTabBarRedux history={history} page="myTab"/>
                </div>
            )
        }
    }
}

const MyTabRedux = connect((state)=>({
    loginObj: state.loginObj
}), (dispatch)=>({
    logOut:()=>{
        {dispatch(doFetch('accesstoken','post',{accesstoken:''},'_LOGOUT'))}
    }
}))(MyTab);

export default MyTabRedux;
