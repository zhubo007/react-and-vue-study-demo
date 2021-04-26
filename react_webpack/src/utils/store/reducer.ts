import {fromJS} from 'immutable';
import * as constants from "./constants";

const defaultState =fromJS({
    platformList:[],
    payWayList: [],
    productList: [],
});

export default (state=defaultState, action: any) => {
    switch (action.type) {
        case constants.PLATFORM_LIST_OPTION:
            return state.merge({
                platformList: fromJS(action.platformList)
            });
        case constants.PAY_WAY_LIST_OPTION:
            return state.merge({
                payWayList: fromJS(action.payWayList)
            });
        case constants.SELECT_PRODUCT_LIST_OPTION:
            return state.merge({
                productList: fromJS(action.productList)
            });
        default:
            return state;
    }
}