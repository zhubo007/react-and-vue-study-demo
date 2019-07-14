import {fromJS} from 'immutable';
import * as constants from "./constants";
//数据原周期、走势图周期状态、周期下拉框当前值
const defaultState = fromJS({
    menus:constants.menus,
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case constants.Change_Collapsed:
            return state.set("collapsed",action.collapsed);
        case constants.Change_Selected_Keys:
            return state.set("selectedKeys",fromJS(action.selectedKeys));
        case constants.Change_Open_Keys:
            return state.set("openKeys",fromJS(action.openKeys));
        case constants.Change_Keys:
            return state.merge({
                openKeys:fromJS(action.openKeys),
                selectedKeys:fromJS(action.selectedKeys)
            });
        case constants.Add_RM_Tab_Panes:
            return state.merge({
                tabKeys:fromJS(action.tabKeys),
                panes:fromJS(action.panes),
                activeKey:action.activeKey,
                selectedKeys:fromJS(action.selectedKeys),
            });
        case constants.Change_Active_Key:
            return state.merge({
                activeKey:action.activeKey,
                selectedKeys:fromJS(action.selectedKeys),
            });
        default:
            return state;
    }
}