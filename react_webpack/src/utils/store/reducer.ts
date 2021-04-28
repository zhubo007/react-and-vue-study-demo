import {fromJS} from 'immutable';
import * as constants from "./constants";

const defaultState =fromJS({
    platformList:[],
    payWayList: [],
    productList: [],
    userList: []
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
        case constants.SELECT_USER_LIST_OPTION:
            return state.merge({
                userList: fromJS(action.userList)
            });
        default:
            return state;
    }
}