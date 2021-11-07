import * as constants from "./constants";
import axios from 'axios/index';
import { BoxItemObj, ProductObj, UserEntity} from "../../entity/index"

export const setExpensesTypeList = (expensesTypeList: BoxItemObj[]) => ({
    type: constants.BOX_EXPENSES_TYPE_OPTION,
    expensesTypeList,
});

export const setIncomeTypeList = (incomeTypeList: BoxItemObj[]) => ({
    type: constants.BOX_INCOME_TYPE_OPTION,
    incomeTypeList,
});

export const setPlatformList = (platformList: BoxItemObj[]) => ({
    type: constants.PLATFORM_LIST_OPTION,
    platformList,
});

export const setPayWayList = (payWayList: BoxItemObj[]) => ({
    type: constants.PAY_WAY_LIST_OPTION,
    payWayList,
});

export const setProductList = (productList: ProductObj[]) => ({
    type: constants.SELECT_PRODUCT_LIST_OPTION,
    productList,
});
export const setUserList = (userList: UserEntity[]) => ({
    type: constants.SELECT_USER_LIST_OPTION,
    userList,
});
/**
 *
 * @param {String} boxId
 * @param {String} boxCodeP
 */
export const getBoxItemList = (boxId: any, boxCodeP: string) => {
    return (dispatch: any) => {
        axios.get('/app/common/getBoxItem', {params:{ boxCodeP}}).then((response) => {
            let boxItemList: BoxItemObj[] = response.data;
            const nullOption: BoxItemObj = {boxId: NaN,  boxText: "---请选择---", sort: 0, boxCodeP: "",boxCode:''};
            boxItemList.unshift(nullOption);
            if ('platform'===boxCodeP) {
                dispatch(setPlatformList(boxItemList));
            }
            if ('payWay'===boxCodeP) {
                dispatch(setPayWayList(boxItemList));
            }
            if("expensesType"==boxCodeP){
                dispatch(setExpensesTypeList(boxItemList));
            }
            if("incomeType"==boxCodeP){
                dispatch(setIncomeTypeList(boxItemList));
            }
        }).catch((error) => {
            console.log(error)
        })
    }
};

export const getProductList = () => {
    return (dispatch: any) => {
        axios.get('/app/product/all', {params:{productName:"", brandType:""}}).then((response) => {
            let productList: ProductObj[] = response.data;
            dispatch(setProductList(productList));
        }).catch((error) => {
            console.log(error)
        })
    }
};

export const getUserList = () => {
    return (dispatch: any) => {
        axios.get('/app/user/all', {params:{}}).then((response) => {
            let userList: UserEntity[] = response.data;
            dispatch(setUserList(userList));
        }).catch((error) => {
            console.log(error)
        })
    }
};