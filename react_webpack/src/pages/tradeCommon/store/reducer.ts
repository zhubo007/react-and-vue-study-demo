import {fromJS} from 'immutable';
import * as constants from "./constants";

const defaultState =fromJS({
    brandList:[]
});

export default (state=defaultState, action: any) => {
    switch (action.type) {
        case constants.BOX_BRAND_LIST_OPTION:
            return state.merge({
                brandList: fromJS(action.brandList)
            });
        default:
            return state;
    }
}