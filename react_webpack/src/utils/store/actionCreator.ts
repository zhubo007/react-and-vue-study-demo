import * as constants from "./constants";
import axios from 'axios/index';
import {BoxItemEntity, ProductObj, UserEntity} from "../../entity/index"

export const setPlatformList = (platformList: BoxItemEntity[]) => ({
    type: constants.PLATFORM_LIST_OPTION,
    platformList,
});

export const setPayWayList = (payWayList: BoxItemEntity[]) => ({
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
 * @param {String} boxName
 */
export const getBoxItemList = (boxId: any, boxName: string) => {
    return (dispatch: any) => {
        axios.get('/app/common/getBoxItem', {params:{boxId, boxName}}).then((response) => {
            let boxItemList: BoxItemEntity[] = response.data;
            const nullOption: BoxItemEntity = {boxId: "", boxKey: "", boxText: "---请选择---", sort: 0, boxName: "brandName",boxCode:''};
            boxItemList.unshift(nullOption);
            if ('platform'===boxName) {
                dispatch(setPlatformList(boxItemList));
            }
            if ('payWay'===boxName) {
                dispatch(setPayWayList(boxItemList));
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