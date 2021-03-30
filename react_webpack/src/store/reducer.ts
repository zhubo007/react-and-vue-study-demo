import { combineReducers} from 'redux-immutable';
import { reducer as commonReducer} from '../pages/product/store/index';

//此时的reducer相当于书的目录，将项目的组件reducer分类，并整个一个大的reducer
//redux和redux-immutable都会提供一个combineReducers函数，immutable的使得目录即header也是不可变的
const reducer = combineReducers({
    common_reducer: commonReducer
});

export default reducer;