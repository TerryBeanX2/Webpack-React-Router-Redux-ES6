import React from 'react';
import {hashHistory} from 'react-router';
import {MyTabBarRedux} from '../common/TabBar';
import {MyNavBarRedux} from '../common/NavBar';
import {Button} from 'antd-mobile';

import {connect} from 'react-redux';
class MessageTab extends React.Component {


    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.props.loginObj)!=JSON.stringify(nextProps.loginObj)
    }

    render() {
        const {loginObj} = this.props;
        if(!loginObj.isLogin){
            return(
                <div>
                    <MyNavBarRedux page="messageTab" titleName="消息"/>
                    <Button className="toLoginPage" onClick={()=>hashHistory.push('/Login')}>去登录</Button>
                    <MyTabBarRedux page="messageTab"/>
                </div>
            )
        }else{
            return (
                <div>
                    <MyNavBarRedux page="messageTab" titleName="消息"/>
                    <Button disabled  className="toLoginPage">装修中···</Button>
                    <MyTabBarRedux page="messageTab"/>
                </div>
            )
        }
    }
}

const MessageTabRedux = connect((state)=>({
    loginObj: state.loginObj
}), (dispatch)=>({}))(MessageTab);

export default MessageTabRedux;
