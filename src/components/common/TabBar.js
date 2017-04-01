import React, {Component, PropTypes} from 'react'
import {TabBar, Icon} from 'antd-mobile';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';


class MyTabBar extends React.Component {
    // renderContent(pageText) {
    //     return (
    //         <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
    //             <div style={{ paddingTop: 60 }}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息</div>
    //             <a style={{ display: 'block', marginTop: 40, marginBottom: 600, color: '#108ee9' }} onClick={(e) => {
    //                 e.preventDefault();
    //                 this.setState({
    //                     hidden: !this.state.hidden,
    //                 });
    //             }}
    //             >
    //                 点击切换 tab-bar 显示/隐藏
    //             </a>
    //         </div>
    //     );
    // }


    render() {
        const {selectedTab, changeTab} = this.props;
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                <TabBar.Item
                    title="首页"
                    key="首页"
                    icon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat'
                    }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat'
                    }}
                    />
                    }
                    badge={1}
                    selected={selectedTab === 'indexTab'}
                    onPress={() => {
                        changeTab('indexTab')
                        browserHistory.push('/');
                    }}
                    data-seed="logId"
                >
                    {/*{this.renderContent('生活')}*/}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon type="koubei-o" size="md"/>}
                    selectedIcon={<Icon type="koubei" size="md"/>}
                    title="收藏"
                    key="收藏"
                    badge={'new'}
                    selected={selectedTab === 'favTab'}
                    onPress={() => {
                        changeTab('favTab')
                        browserHistory.push('/404');
                    }}
                    data-seed="logId1"
                >
                    {/*{this.renderContent('口碑')}*/}
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat'
                        }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat'
                        }}
                        />
                    }
                    title="消息"
                    key="消息"
                    dot
                    selected={selectedTab === 'messageTab'}
                    onPress={() => {
                        changeTab('messageTab')
                    }}
                >
                    {/*{this.renderContent('朋友')}*/}
                </TabBar.Item>
                <TabBar.Item
                    icon={{uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'}}
                    selectedIcon={{uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}}
                    title="我的"
                    key="我的"
                    selected={selectedTab === 'myTab'}
                    onPress={() => {
                        changeTab('myTab')
                    }}
                >
                    {/*{this.renderContent('我的')}*/}
                </TabBar.Item>
            </TabBar>
        );
    }
}

//约束类型
MyTabBar.propTypes = {
    selectedTab: PropTypes.string.isRequired,
    changeTab: PropTypes.func.isRequired
};

//事件创造器
function actionCreate(witchTab) {
    return {
        type: 'CHANGE_TAB',
        payload: {selectedTab: witchTab}
    }
}

//本组件的Reducer
function MyTabBarReducer(selectedTab = 'indexTab', action) {
    switch (action.type) {
        case 'CHANGE_TAB':
            return action.payload.selectedTab;
        default:
            return selectedTab;
    }
}

//关联redux
const MyTabBarRedux = connect((state)=>({selectedTab: state.selectedTab}), (dispatch)=>({changeTab: (witchTab) => dispatch(actionCreate(witchTab))}))(MyTabBar);

export {MyTabBarRedux, MyTabBarReducer}


//以上是简洁的写法，便于看我源码的人理解，下面贴出拆分的写法

// 映射redux state到属性
// function mapStateToProps(state) {
//     return {
//         selectedTab: state.selectedTab
//     }
// }
//
// 映射redux action到属性
// function mapDispatchToProps(dispatch) {
//     return {
//         changeTab: (witchTab) => dispatch(actionCreate(witchTab))
//     }
// }
//
// const MyTabBarRedux = connect(mapStateToProps,mapDispatchToProps)(MyTabBar);



