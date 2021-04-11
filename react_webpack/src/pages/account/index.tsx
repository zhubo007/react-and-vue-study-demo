import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import '../../main.css';

interface AccountProps {
}

interface AccountState {
}

const apiURI = process.env.REACT_APP_API_URL;

class Account extends React.Component<AccountProps, AccountState> {

    constructor(props: AccountProps) {
        super(props);
    }

    render(){
        return (
            <Fragment>
                <h1>Hello, This is 记账功能页面</h1>
            </Fragment>
        )
    }
}

const initMapStateToProps = (state: any) => {
    return {
    }
};
const initMapDispatchToProps = (dispatch: any) => {
    return {
    }
};

export default connect(initMapStateToProps, initMapDispatchToProps)(Account);