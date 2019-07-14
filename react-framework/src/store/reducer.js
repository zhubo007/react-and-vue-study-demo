import { combineReducers} from 'redux-immutable';
import { reducer as componentReducer} from '../component/store';
import { reducer as userReducer} from '../pages/user/store';
import { reducer as chartJSDemoReducer} from '../pages/chartjs-demo/store';
import { reducer as echartsDemoReducer} from '../pages/echarts-demo/store';
//此时的reducer相当于书的目录，将项目的组件reducer分类，并整个一个大的reducer
//redux和redux-immutable都会提供一个combineReducers函数，immutable的使得目录即header也是不可变的
const reducer = combineReducers({
    component: componentReducer,
    user_data: userReducer,
    echarts: echartsDemoReducer,
    chart_js: chartJSDemoReducer,
});

export default reducer;