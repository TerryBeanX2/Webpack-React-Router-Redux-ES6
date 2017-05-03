import React from 'react';
import {MyNavBarRedux} from './NavBar';
import {connect} from 'react-redux';
import doFetch from '../../commonActions/fetch';
import {Button,InputItem,List} from 'antd-mobile';
import { createForm } from 'rc-form';

class Login extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            userInput:''
        }
    }

    onInputChange(val){
        this.setState({
            userInput:val
        })
    }

    componentDidUpdate(){
        if(this.props.loginObj.isLogin){
            this.props.history.goBack();
        }
    }

    render(){
        const {loginObj,doLogin,history} = this.props;
        const { getFieldProps } = this.props.form;
        return(
            <div>
                <MyNavBarRedux history={history} titleName="登录" page="LoginPage" />
                <List renderHeader={() => '获取Accesstoken方法：CNode登录=>设置=>最下方'}>
                    <InputItem
                        {...getFieldProps('input3')}
                        placeholder="Accesstoken"
                        autoFocus
                        onChange={(val)=>this.onInputChange(val)}
                        value={this.state.userInput}
                    />
                </List>
                <Button className="toLoginPage" onClick={()=>doLogin(this.state.userInput)}>登录</Button>
            </div>
        )
    }
}

const LoginRedux = connect((state)=>({
    loginObj:state.loginObj
}),(dispatch)=>({
    doLogin:(accesstoken)=>{dispatch(doFetch('accesstoken','post',{accesstoken:accesstoken},'_LOGIN'))}
}))(Login);

const LoginReduxWrapper = createForm()(LoginRedux);

export default LoginReduxWrapper;