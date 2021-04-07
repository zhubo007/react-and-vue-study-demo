import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import '../../main.css';

interface AccountProps {
}

interface AccountState {
}


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