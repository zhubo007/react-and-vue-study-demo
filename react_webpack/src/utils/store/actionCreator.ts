import * as constants from "./constants";
import axios from 'axios/index';
import {BoxItemEntity} from "../../entity/index"

export const setPlatformList = (platformList: BoxItemEntity[]) => ({
    type: constants.PLATFORM_LIST_OPTION,
    platformList,
});

export const setPayWayList = (payWayList: BoxItemEntity[]) => ({
    type: constants.PAY_WAY_LIST_OPTION,
    payWayList,
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
