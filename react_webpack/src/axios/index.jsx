import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd'

export default class Axios {

    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url,
                { param: 'callback' },
                function (err, response) {
                    if (response.sattus = 'success') {
                        resolve(response.data)
                    } else {
                        reject(response.message)
                    }
                })
        })
    }

    static ajax(options) {
        let baseApi = "";
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                // baseURL: baseApi,
                timeout: 10000,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if(response.status == '200'){
                    let result = response.data;
                    resolve(result)
                }else{
                    Modal.info({
                        title: '提示',
                        content: response.data
                    })
                    reject(response)
                }
            }).catch((error)=>{
                // console.log(error);
                Modal.info({
                    title: '提示',
                    content: "错误"
                })
                reject(error)
            })
        })
    }
}