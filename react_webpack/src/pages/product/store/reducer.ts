import {fromJS} from 'immutable';
import * as constants from "./constants";

//fromJS 把JS对象更改成一个immutable对象，不使用需要将fromJS删除
const defaultState =fromJS({
    brandList:[]
});
//state参数不能做修改，需要返回一个新的state
export default (state=defaultState, action: any) => {
    switch (action.type) {
        case constants.BOX_BRAND_LIST_OPTION:
            //不使用immutable需要创建一个新的state，修改它的值并返回，如下：
            // const newState = JSON.parse(JSON.stringify(state));
            // newState.brandList = action.brandList;
            // return newState;
            //数组对象等复杂的值变更，需要使用fromJS设置
            return state.merge({
                brandList: fromJS(action.brandList)
            });
        default:
            return state;
    }
}