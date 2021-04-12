import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import '../../main.css';
import * as qs from 'qs';


enum Color {
  Blue,
  Red,
  Green
}
export interface Accounting {
    dealNo: string;
    productId: string;
    seller: string;
    buyer: string;
    payWay: string;
    payType: string;
    productNum: number;
    productPrice: number;
    totalPrice: number;
    recordTime: string;
}

interface AccountProps {
    accounts: Accounting[];
    param: {
        startTime: string;
        endTime: string;
    };
    setParam: (param: AccountProps['param']) => void;
}

interface AccountState {

}

//const apiURI = process.env.REACT_APP_API_URL;

class Account extends React.Component<AccountProps, AccountState> {

    constructor(props: AccountProps) {
        super(props);
    }

    // @ts-ignore
    render() {
        return (
            <Fragment>
                <h1>Hello, This is 记账功能页面</h1>
            </Fragment>
        )
    }
}

const initMapStateToProps = (state: any) => {
    return {}
};
const initMapDispatchToProps = (dispatch: any) => {
    return {}
};

export default connect(initMapStateToProps, initMapDispatchToProps)(Account);