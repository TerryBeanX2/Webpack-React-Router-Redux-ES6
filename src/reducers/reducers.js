import {combineReducers} from 'redux';
import {MyTabBarReducer} from '../components/common/TabBar';
import {HomeListReducer} from '../components/Home/Home';
const reducers = combineReducers({
    selectedTab:MyTabBarReducer,
    homeList:HomeListReducer
});



export default reducers;