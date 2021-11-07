import * as constants from "./constants";
import axios from 'axios';
import {BoxItemObj} from "../../../entity/index"

export const setBrandList = (brandList: BoxItemObj[]) => ({
    type: constants.BOX_BRAND_LIST_OPTION,
    brandList,
});
/**
 * 查询品牌信息
 * @param {String} boxId 
 * @param {String} boxCodeP
 */
export const getBrandList = (boxId: any, boxCodeP: string) => {
    return (dispatch: any) => {
        axios.get('/app/common/getBoxItem', {params:{boxId, boxCodeP}}).then((response) => {
            let brandList: BoxItemObj[] = response.data;
            const nullOption: BoxItemObj = {boxId: NaN,  boxText: "---请选择---",boxCode: "", sort: 0, boxCodeP: ""};
            brandList.unshift(nullOption);
            dispatch(setBrandList(brandList));
        }).catch((error) => {
            console.log(error)
        })
    }
};
