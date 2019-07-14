import * as constants from "./constants";
import axios from 'axios';


export const action = (option) => ({
    type: constants.Change_Option,
    option,
});

export const addIndexOption = (option) => {
    return (dispatch) => {
        axios.get('http://160.9.229.103:8080/market_monitor/').then((response) => {

        }).catch((error) => {

        })
    }
};