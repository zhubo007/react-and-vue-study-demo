import {fromJS} from 'immutable';
import * as constants from "./constants";

const defaultState =fromJS({
    expensesTypeList:[],
    incomeTypeList:[],
    platformList:[],
    payWayList: [],
    productList: [],
    userList: []
});

export default (state=defaultState, action: any) => {
    switch (action.type) {
        case constants.BOX_EXPENSES_TYPE_OPTION:
            //不使用immutable需要创建一个新的state，修改它的值并返回，如下：
            // const newState = JSON.parse(JSON.stringify(state));
            // newState.brandList = action.brandList;
            // return newState;
            //数组对象等复杂的值变更，需要使用fromJS设置
            return state.merge({
                expensesTypeList: fromJS(action.expensesTypeList)
            });
        case constants.BOX_INCOME_TYPE_OPTION:
            return state.merge({
                incomeTypeList: fromJS(action.incomeTypeList)
            });

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