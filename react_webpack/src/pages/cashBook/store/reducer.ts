import {fromJS} from 'immutable';
import * as constants from "./constants";

//fromJS 把JS对象更改成一个immutable对象，不使用需要将fromJS删除
const defaultState =fromJS({

});
//state参数不能做修改，需要返回一个新的state
export default (state=defaultState, action: any) => {
    switch (action.type) {
        default:
            return state;
    }
}