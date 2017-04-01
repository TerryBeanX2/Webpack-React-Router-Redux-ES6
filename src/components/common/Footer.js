import React from 'react';

export default class Footer extends React.Component {

    render() {
        return (
            <footer className="overflow-container">
                <ul id="Subnav" className="subnav">
                    <li className="active"><a href="#">主页</a></li>
                    <li><a href="#">收藏</a></li>
                    <li><a href="#">消息</a></li>
                    <li><a href="#">我的 <span className="badge">20</span></a></li>
                </ul>
            </footer>
        )
    }
}