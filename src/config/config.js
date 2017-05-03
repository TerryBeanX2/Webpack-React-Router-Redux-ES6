//使用H5 history API
// import {BrowserRouter as Router} from 'react-router-dom'
//使用哈希路由
import {HashRouter as Router} from 'react-router-dom'
const config = {
    target:'http://cnodejs.org/api/v1/',
    pageSize:20,
    Router:Router
};
export default config;
