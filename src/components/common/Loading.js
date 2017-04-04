import React from 'react';
import {Toast,WingBlank} from 'antd-mobile';
export  default class Loading extends React.Component {
    componentDidMount() {
        Toast.loading('加载中...', 5, () => {});
    }
    componentWillUnmount() {
        Toast.hide()
    }

    render() {
        return (
            <WingBlank>
            </WingBlank>
        )
    }
}