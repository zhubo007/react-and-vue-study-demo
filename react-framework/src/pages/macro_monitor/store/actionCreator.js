import * as constants from "./constants";
import axios from 'axios';

const setStartEndTime = (startDate, endDate, frequency,frequencyName,freKey,freLabel) => ({
    type: constants.Set_StartEnd_Time,
    startDate, endDate, frequency,frequencyName,freKey,freLabel
});
const addIndexOptionAction = (indexInfo, indexCode, indexName) => ({
    type: constants.Add_Index_Option,
    indexInfo,
    indexCode,
    indexName
});

export const changeOption = (option, chartStart, chartEnd, chartFre, chartFreName) => ({
    type: constants.Change_Option,
    option,
    chartStart,
    chartEnd,
    chartFre,
    chartFreName
});

export const changeIndexOption = (indexCode,indexName) => ({
    type: constants.Change_Index_Option,
    indexCode,
    indexName
});
export const changeTime = (startDate,endDate) => ({
    type: constants.Change_Time,
    startDate,
    endDate
});

export const changeFrequencyValue = (freKey,freLabel) => ({
    type: constants.Change_Frequency_Value,
    freKey,
    freLabel
});

export const addIndexOption = (option) => {
    return (dispatch) => {
        axios.get('http://160.9.229.103:8080/market_monitor/macroMonitor/indexInfo').then((response) => {
            const result = response.data;
            const initData = result[0];
            dispatch(addIndexOptionAction(result, initData['INDEXCODE'], initData['INDEXNAMESOURCE']));
            dispatch(setIndexCycleInfo(initData['INDEXCODE'],initData['INDEXNAMESOURCE'],option));
        }).catch((error) => {

        })
    }
};

export const setIndexCycleInfo = (indexCode,indexName, option) => {
    return (dispatch) => {
        axios.get('http://160.9.229.103:8080/market_monitor/macroMonitor/freSEDate', {params:{indexCode:indexCode}}).then((response) => {
            const result = response.data;
            const frequency = result['FREQUENCY'];
            const startDate = result['STARTDATE'];
            const endDate = result['ENDDATE'];
            if (frequency === 1) {
                dispatch(setStartEndTime(startDate,endDate, frequency,'日',3,'月'));//只有这里会设置周期的下拉框的值，其他情况由组件处理
                dispatch(setChartData(indexCode,indexName,startDate,endDate,1,3,'月', option));//走势图的周期状态在此处处理
            }else if (frequency === 3){
                dispatch(setStartEndTime(startDate,endDate, frequency,'月',3,'月'));
                dispatch(setChartData(indexCode,indexName,startDate,endDate,3,3,'月', option));
            }else {
                const frequencyName = constants.frequencyObj[frequency];
                dispatch(setStartEndTime(startDate,endDate, frequency,frequencyName,3,'月'));
                dispatch(setChartData(indexCode,indexName,startDate,endDate,frequency,frequency,frequencyName, option));
            }
        }).catch((error) => {

        })
    }
};
export const setChartData = (indexCode,indexName, startDate, endDate, frequency, chartFre,chartFreName, option) => {
    return (dispatch) => {
        const newOption = option.toJS();
        axios.get('http://160.9.229.103:8080/market_monitor/macroMonitor/indexData',{
            params: {"indexCode":indexCode,"frequency":frequency,"startDate":startDate, "endDate":endDate,"searchFre":chartFre}
        }).then(function (response) {
            const {x_list, data_list} = response.data;
            newOption.series.data = data_list;
            newOption.xAxis.data = x_list;
            newOption.series.name=indexName;
            newOption.legend.data[0]=indexName;
            dispatch(changeOption(newOption,x_list[0],x_list[x_list.length-1],chartFre,chartFreName))
        }).catch(function (error) {
            console.log("error",error);
        });
    }
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