import * as constants from "./constants";
import axios from 'axios';


const setTableData = (tableData,pages,total,currentPageNum,currentPageSize) => ({
    type:constants.Set_Table_Data,
    tableData,
    pages,
    total,
    currentPageNum,
    currentPageSize
});

export const selectChange = (selectedRowKeys) => ({
    type:constants.Select_Change,
    selectedRowKeys
});

export const getUserData =  (pageNumber,pageSize) => {
    return (dispatch) => {
        axios.get(BaseURL+"/user/userData",{params:{pageNumber,pageSize}}).then((res) => {
            const {data, pages, total} = res.data;
            dispatch(setTableData(data,pages,total,pageNumber,pageSize))
        })
    }
};
export const addUser =  (values,pageNumber,pageSize) => {
    return (dispatch) => {
        axios({
            url: BaseURL+"/user/addUser",
            method: 'post',
            data: values,
            transformRequest: [function (data) {
                let ret = '';
                for (let item in data) {
                    ret += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
                }
                return ret
            }],
        }).then((res) => {
            dispatch(getUserData(pageNumber,pageSize))
        })
    }
};
export const updateUser =  (values,pageNumber,pageSize) => {
    return (dispatch) => {
        axios({
            url: BaseURL+"/user/updateUser",
            method: 'post',
            data: values,
            transformRequest: [function (data) {
                let ret = '';
                for (let item in data) {
                    ret += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
                }
                return ret
            }],
        }).then((res) => {
            dispatch(getUserData(pageNumber,pageSize))
        })
    }
};
export const handleDelUser =  (userId) => {
    return (dispatch) => {
        axios.delete(BaseURL+"/user/delUser",{params:{userId:userId}})
            .then((res) => {
                dispatch(getUserData())
        });
    }
};