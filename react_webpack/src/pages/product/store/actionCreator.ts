import * as constants from "./constants";
import axios from 'axios';
import {BrandObj} from "../../../entity/index"

export const setBrandList = (brandList: BrandObj[]) => ({
    type: constants.BOX_BRAND_LIST_OPTION,
    brandList,
});
/**
 * 查询品牌信息
 * @param {String} boxId 
 * @param {String} boxName 
 */
export const getBrandList = (boxId: any, boxName: string) => {
    return (dispatch: any) => {
        axios.get('/app/common/getBoxItem', {params:{boxId, boxName}}).then((response) => {
            let brandList: BrandObj[] = response.data;
            const nullOption: BrandObj = {boxId: "", boxKey: "", boxText: "---请选择---", sort: 0, boxName: "brandName"};
            brandList.unshift(nullOption);
            dispatch(setBrandList(brandList));
        }).catch((error) => {
            console.log(error)
        })
    }
};
