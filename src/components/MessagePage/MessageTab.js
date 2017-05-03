import React from 'react';
import {MyTabBarRedux} from '../common/TabBar';
import {MyNavBarRedux} from '../common/NavBar';
import {Button} from 'antd-mobile';

import {connect} from 'react-redux';
import Loading from '../common/Loading';
class MessageTab extends React.Component {


    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.props.loginObj)!=JSON.stringify(nextProps.loginObj)
    }

    render() {
        const {loginObj,history} = this.props;
        if(!loginObj.isLogin){
            console.log('message页面未登录状态渲染了一次');
            return(
                <div>
                    <MyNavBarRedux history={history} page="messageTab" titleName="消息"/>
                    <Button className="toLoginPage" onClick={()=>history.push('/Login')}>去登录</Button>
                    <MyTabBarRedux history={history} page="messageTab"/>
                </div>
            )
        }
        else if(loginObj.isLogining||!loginObj.successObj){
            return(
                <div>
                    <MyNavBarRedux history={history} page="messageTab" titleName="消息"/>
                    <Loading/>
                    <MyTabBarRedux history={history} page="messageTab"/>
                </div>
            )
        }else{
            console.log('message页面登录状态渲染了一次');
            return (
                <div>
                    <MyNavBarRedux history={history} page="messageTab" titleName="消息"/>
                    <Button disabled  className="toLoginPage">装修中···</Button>
                    <MyTabBarRedux history={history} page="messageTab"/>
                </div>
            )
        }
    }
}

const MessageTabRedux = connect((state)=>({
    loginObj: state.loginObj
}), (dispatch)=>({}))(MessageTab);

export default MessageTabRedux;
