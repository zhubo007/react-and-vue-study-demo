import * as constants from "./constants";
import axios from 'axios';
import {fromJS} from 'immutable';

export const setBrandList = (brandList) => ({
    type: constants.BOX_BRAND_LIST_OPTION,
    brandList,
});
/**
 * 查询品牌信息
 * @param {String} boxId 
 * @param {String} boxName 
 */
export const getBrandList = (boxId, boxName) => {
    return (dispatch) => {
        axios.get('/app/common/getBoxItem', {params:{boxId, boxName}}).then((response) => {
            var nullOption = {boxId: "", boxKey: "", boxText: "---请选择---", sort: 0, boxName: "brandName"};
            response.data.unshift(nullOption)
            dispatch(setBrandList(response.data));
            
        }).catch((error) => {
            console.log(error)
        })
    }
};

export const auth = (url, cookie) => {
    // 当需要用URL作为参数可以使用encodeURIComponent对URL进行编码
    // encodeURIComponent("http:localhost:8080/HTAI/portal/");
    window.open("http://160.5.30.151:8080/HTAI/portal/auth?ssoToken=123454888888111111")
};

const download = (data,fileName) => {
    if(!data){
        return
    }
    const blob = new Blob([data], {type: 'application/msexcel'});
    const url = window.URL.createObjectURL(blob);
    const aLink = document.createElement("a");
    aLink.style.display = "none";
    aLink.href = url;
    aLink.setAttribute("download", fileName+".xlsx");
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink); //下载完成移除元素
    window.URL.revokeObjectURL(url); //释放掉blob对象
};
export const getChartExcel = (indexCode,indexName, chartStart, chartEnd, frequency, chartFre,chartFreName) => {
    return (dispatch) => {
        let url = "";
        if(frequency === chartFre){
            url="http://160.9.229.103:8080/market_monitor/macroMonitor/monitorExcel";
        }else{
            url="http://160.9.229.103:8080/market_monitor/macroMonitor/monitorSpecialExcel";
        }
        axios.get(url, {
            params:{"startDate": chartStart, "endDate": chartEnd, "names":indexName+"_"+chartFreName,
                "indexCode":indexCode, "frequency":frequency,},
            responseType: 'blob', //二进制流
        }).then(function (response) {
            console.log(response);
            const fileName = indexName+ "_" + chartStart + "_" +chartEnd+"_"+ chartFreName;
            download(response.data, fileName)
        }).catch(function (error) {
            console.log(error)
        });
    }
};

