import React, { PureComponent } from 'react';
import {connect } from 'react-redux';
import { DatePicker } from 'antd';
import { actionCreator } from '../store/index';
import moment from 'moment';
const { RangePicker } = DatePicker;

const dateFormat = 'YYYYMMDD';

class RangeDate extends PureComponent {


    render(){
        const { startDate, endDate,changeTime } = this.props;
        return (
            <RangePicker
                value={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
                format={dateFormat} onChange={changeTime}
            />
        )
    }
}
const initMapStateToProps = (state) => {
    return {
        startDate: state.getIn(['macro_monitor', 'startDate']),
        endDate: state.getIn(['macro_monitor', 'endDate'])
    }
};
const initMapDispatchToProps = (dispatch) => {
    return {
        changeTime(value1,value2){
            dispatch(actionCreator.changeTime(value2[0],value2[1]))
        }
    }
};
export default connect(initMapStateToProps,initMapDispatchToProps)(RangeDate);