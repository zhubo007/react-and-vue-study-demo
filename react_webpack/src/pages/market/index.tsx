import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import '../../main.css';
import {Button, Input, message, Select, Table} from "antd";
import moment from 'moment'
import {BoxItemEntity, ProductObj, TradeCommonEntity, UserEntity} from "../../entity/index";
import axios from "axios";
import {actionCreator} from "../../utils/store/index";

const Option = Select.Option;

export interface MarketProps {

}

interface MarketState {

}

class Market extends React.Component<MarketProps, MarketState> {

    constructor(props: MarketProps) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    request = () => {
    };

    onAddCancel = () => {
    };

    onSelectChange = (selectedRowKeys: string[]) => {
    };
    onCreate = (values: any) => {
    };

    render() {

        return (
            <Fragment>
                <h1>Hello Super</h1>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
    }
};
const mapDispatchToProps = (dispatch: any) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);