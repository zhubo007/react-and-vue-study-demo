import * as constants from "./constants";
import axios from 'axios';

export const setBrandList = (brandList: Array<any>) => ({
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
            var nullOption = {boxId: "", boxKey: "", boxText: "---请选择---", sort: 0, boxName: "brandName"};
            response.data.unshift(nullOption);
            console.log(response.data)
            dispatch(setBrandList(response.data));
            
        }).catch((error) => {
            console.log(error)
        })
    }
};
