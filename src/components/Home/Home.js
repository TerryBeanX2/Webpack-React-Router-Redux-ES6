import React from 'react';
import {Link} from 'react-router';
import './Home.scss';
import Footer from '../common/Footer';
export default class Home extends React.Component{
    render(){
        return(
            <div>
                <div data-flex="main:center cross:center" style={{width:"500px", height: "500px", background: "#f1d722"}}>
                    <div>看看我是不是居中的</div>
                </div>
            </div>
        )
    }
}

