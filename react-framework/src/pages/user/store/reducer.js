import {fromJS} from 'immutable';
import * as constants from "./constants";
//数据原周期、走势图周期状态、周期下拉框当前值
const defaultState = fromJS({
    tableData:[],
    selectedRowKeys:[],
    add_visible:false,
    pages:0,
    total:0,
    currentPageNum:0,
    currentPageSize:0
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case constants.Set_Table_Data:
            return state.merge({
                tableData:fromJS(action.tableData),
                pages:action.pages,
                total:action.total,
                currentPageNum:action.currentPageNum,
                currentPageSize:action.currentPageSize,
            });
        case constants.Select_Change:
            return state.set("selectedRowKeys",fromJS(action.selectedRowKeys));
        default:
            return state;
    }
}