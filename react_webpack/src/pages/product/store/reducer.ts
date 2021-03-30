import {fromJS} from 'immutable';
import * as constants from "./constants";
//数据原周期、走势图周期状态、周期下拉框当前值
const defaultState = fromJS({
    brandList:[]
});

export default (state=defaultState, action: any) => {
    switch (action.type) {
        case constants.BOX_BRAND_LIST_OPTION:
            return state.merge({
                brandList: fromJS(action.brandList)
            });
        default:
            return state;
    }
}