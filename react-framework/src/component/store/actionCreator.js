import * as constants from "./constants";
import axios from 'axios';


export const changeSelectedKeys = (selectedKeys) => ({
    type: constants.Change_Selected_Keys,
    selectedKeys
});

export const getChartExcel = (indexCode) => {
    return (dispatch) => {

    }
};