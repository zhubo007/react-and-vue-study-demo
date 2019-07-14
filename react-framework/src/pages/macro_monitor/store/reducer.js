import {fromJS} from 'immutable';
import * as constants from "./constants";
//数据原周期、走势图周期状态、周期下拉框当前值
const defaultState = fromJS({
    option: constants.Default_Option,
    indexInfo: [],
    indexCode: 0,
    indexName: '',
    startDate: new Date(),
    endDate: new Date(),
    chartFre: 1,
    chartFreName: '日',
    frequency:1,
    frequencyName: '日',
    freKey:1,
    freLabel:'日',
    chartStart: new Date(),
    chartEnd: new Date()
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case constants.Change_Option:
            return state.merge({
                option: fromJS(action.option),
                chartStart:action.chartStart,
                chartEnd:action.chartEnd,
                chartFre:action.chartFre,
                chartFreName:action.chartFreName
            });
        case constants.Add_Index_Option:
            return state.merge({
                indexInfo: fromJS(action.indexInfo),
                indexName: action.indexName,
                indexCode: action.indexCode
            });
        case constants.Change_Index_Option:
            return state.merge({
                indexName: action.indexName,
                indexCode: action.indexCode
            });
        case constants.Set_StartEnd_Time:
            return state.merge({
                startDate: action.startDate,
                endDate: action.endDate,
                frequency: action.frequency,
                frequencyName: action.frequencyName,
                freKey: action.freKey,
                freLabel: action.freLabel
            });
        case constants.Change_Frequency_Value:
            return state.merge({
                freKey:action.freKey,
                freLabel:action.freLabel
            });
        case constants.Change_Time:
            return state.merge({
                startDate: action.startDate,
                endDate: action.endDate
            });
        default:
            return state;
    }
}