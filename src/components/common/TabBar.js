import React, {Component, PropTypes} from 'react'
import {TabBar, Icon} from 'antd-mobile';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';


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
        const {selectedTab, changeTab, page} = this.props;
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
                        background: 'url(src/images/homePage1.svg) center center /  90% 90% no-repeat'
                    }}/>}
                    selectedIcon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: 'url(src/images/homePage.svg) center center /  90% 90% no-repeat'
                    }}/>}
                    selected={page === 'indexTab'}
                    onPress={() => {

                        changeTab('indexTab');
                        hashHistory.push('/');
                    }}
                    data-seed="logId"
                >
                    {/*{this.renderContent('')}*/}
                </TabBar.Item>
                <TabBar.Item
                    icon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: 'url(src/images/favPage1.svg) center center /  90% 90% no-repeat'
                    }}/>}
                    selectedIcon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: 'url(src/images/favPage.svg) center center /  90% 90% no-repeat'
                    }}/>}
                                       title="收藏"
                                       key="收藏"
                                       selected={page === 'favTab'}
                                       onPress={() => {
                                           changeTab('favTab');
                                           hashHistory.push('/Fav');
                                       }}
                                       data-seed="logId1"
                    >
                        {/*{this.renderContent('')}*/}
                    </TabBar.Item>
                    < TabBar.Item
                        icon={<div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(src/images/messagePage1.svg) center center /  90% 90% no-repeat'
                        }}/>}
                        selectedIcon={
                            <div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: 'url(src/images/messagePage.svg) center center /  90% 90% no-repeat'
                            }}/>}
                        title="消息"
                        key="消息"
                        dot
                        selected={page === 'messageTab'}
                        onPress={() => {
                        changeTab('messageTab');
                        hashHistory.push('/Message');
                    }}
                        >
                    {/*{this.renderContent('')}*/}
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: 'url(src/images/myPage1.svg) center center /  90% 90% no-repeat'
                            }}/>}
                        selectedIcon={<div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(src/images/myPage.svg) center center /  90% 90% no-repeat'
                        }}/>}
                        title="我的"
                        key="我的"
                        selected={page === 'myTab'}
                        onPress={() => {
                            changeTab('myTab');
                            hashHistory.push('/My');
                        }}
                        >
                        {/*{this.renderContent('')}*/}
                        </TabBar.Item>
                        </TabBar>
                        );
                        }
                }

                //约束类型
                MyTabBar.propTypes={
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


                //关联redux
                const
                MyTabBarRedux=connect((state)=>({selectedTab: state.selectedTab}), (dispatch)=>({changeTab: (witchTab) => dispatch(actionCreate(witchTab))}))(MyTabBar);

                export {MyTabBarRedux}


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



