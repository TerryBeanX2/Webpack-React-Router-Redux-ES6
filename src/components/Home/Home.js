import React from 'react';
import {Link} from 'react-router';
import './Home.scss';

import {connect} from 'react-redux';

class Home extends React.Component {
    render() {
        const {homeList} = this.props;
        const listItems = homeList.map(({title})=>(
            <div>{title}</div>
        ))
        return (
            <div>
                {listItems}
            </div>
        )
    }
}

function HomeListReducer(homeList = [], action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return [];
        case 'FETCH_SUCCESS':
            return action.payload.data;
        default:
            return homeList;
    }
}

const HomeRedux = connect((state)=>({homeList: state.homeList}))(Home);

export {HomeRedux, HomeListReducer}