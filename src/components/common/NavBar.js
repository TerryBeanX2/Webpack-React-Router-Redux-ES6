import React from 'react';
import {Popover, NavBar, Icon} from 'antd-mobile';
import {connect} from 'react-redux';
import doFetch from '../../commonActions/fetch';
import config from '../../config/config'
const Item = Popover.Item;

const ReturnButton = () =>(
    <div>返回</div>
);

class MyNavBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false
        };
    }

    onSelect(opt) {
        this.setState({
            visible: false
        });
    };

    handleVisibleChange(visible) {
        this.setState({
            visible
        });
    };

    returnTop() {
        setTimeout(()=> {
            if (document.getElementsByClassName('homeList')[0])
                document.getElementsByClassName('homeList')[0].scrollTop = 0;
        }, 100)

    }

    render() {
        const {homeListObj, changeArticleType, page, titleName, history} = this.props;
        let offsetX = -10; // just for pc demo
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            offsetX = -26;
        }
        return (<div>
            <NavBar leftContent={page === 'DetailPage' || page === 'LoginPage' ? (<ReturnButton />) : ''}
                    onLeftClick={()=> {
                        history.goBack()
                    }}
                    iconName={false} mode="light"
                    rightContent={
                        page === 'indexTab' ? (
                            <Popover mask
                                     visible={this.state.visible}
                                     overlay={[
                                         (<Item key="4" value="all">全部</Item>),
                                         (<Item key="5" value="good">精华</Item>),
                                         (<Item key="6" value="share">分享</Item>),
                                         (<Item key="7" value="ask">问答</Item>),
                                         (<Item key="8" value="job">招聘</Item>),
                                     ]}
                                     popupAlign={{
                                         overflow: {adjustY: 0, adjustX: 0},
                                         offset: [offsetX, 15],
                                     }}
                                     onVisibleChange={(e)=>this.handleVisibleChange(e)}
                                     onSelect={(e)=> {
                                         this.onSelect();
                                         this.returnTop();
                                         if (e.props.value == homeListObj.articleType)return;
                                         changeArticleType('topics', 'get', {
                                             page: 1,
                                             limit: config.pageSize,
                                             tab: e.props.value,
                                             mdrender: 'false'
                                         });
                                     }}
                            >
                                <div style={{
                                    height: '100%',
                                    padding: '0 0.3rem',
                                    marginRight: '-0.3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                    <Icon type="ellipsis"/>
                                </div>
                            </Popover>
                        ) : ('')

                    }
            >
                <span onClick={()=> {
                    {/*回到顶部，目前是个坑*/
                    }
                    this.returnTop();
                }}>{titleName}</span>
            </NavBar>
        </div>);
    }
}

//Action生成器，生成的事件dispatch后触发的也是加载HomeList的大Reducer
const changeArticleType = (val)=>({
    type: 'CHANGE_ARTICLE_TYPE',
    payload: {
        tab: val
    }
});

//关联redux
const MyNavBarRedux = connect((state)=>({
    homeListObj: state.homeListObj,
    selectedTab: state.selectedTab
}), (dispatch)=>({
    changeArticleType: (url, type, json)=> {
        dispatch(changeArticleType(json.tab))
        dispatch(doFetch(url, type, json, '_TOPICS'))
    }
}))(MyNavBar);

export {MyNavBarRedux};

















