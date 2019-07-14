import React, { PureComponent, Fragment } from 'react';
import { Button } from 'antd';
import {connect } from 'react-redux';
import {actionCreator} from '../macro_monitor/store/index'
import { IndexSelect, Chart, RangeDate, Frequency} from '../macro_monitor/components/index';

class EChartsDemo extends PureComponent{

    render(){
        const {handleGetExcel, handleSearchClick,indexCode,indexName, startDate, endDate,
            frequency, freKey,freLabel, option, chartStart, chartEnd,chartFreName,chartFre } = this.props;
        return (
            <Fragment>
                <IndexSelect/>
                <RangeDate/>
                <Frequency/>
                <Button type="primary" icon="search"
                        onClick={() => handleSearchClick(indexCode,indexName, startDate, endDate, frequency, freKey, freLabel, option)}>Search</Button>
                <Button type="default" icon="file-excel"
                        onClick={() => handleGetExcel(indexCode,indexName, chartStart, chartEnd, frequency, chartFre,chartFreName)}>Download</Button>
                <div>
                    <Chart/>
                </div>
            </Fragment>
        )
    }


}

const initMapStateToProps = (state) => {
    return {
        option:state.getIn(['macro_monitor','option']),
        indexCode:state.getIn(['macro_monitor','indexCode']),
        indexName: state.getIn(['macro_monitor','indexName']),
        startDate: state.getIn(['macro_monitor','startDate']),
        endDate: state.getIn(['macro_monitor','endDate']),
        freKey: state.getIn(['macro_monitor','freKey']),
        freLabel: state.getIn(['macro_monitor','freLabel']),
        chartFre: state.getIn(['macro_monitor','chartFre']),
        chartFreName: state.getIn(['macro_monitor','chartFreName']),
        frequency:state.getIn(['macro_monitor','frequency']),
        frequencyName: state.getIn(['macro_monitor','frequencyName']),
        chartStart: state.getIn(['macro_monitor','chartStart']),
        chartEnd: state.getIn(['macro_monitor','chartEnd'])
    }
};
const initMapDispatchToProps = (dispatch) => {
    return {
        handleSearchClick(indexCode,indexName, startDate, endDate, frequency, freKey, freLabel, option){
            dispatch(actionCreator.setChartData(indexCode,indexName, startDate, endDate, frequency, freKey,freLabel, option))
        },
        handleGetExcel(indexCode,indexName, chartStart, chartEnd, frequency, chartFre,chartFreName){
            dispatch(actionCreator.getChartExcel(indexCode,indexName, chartStart, chartEnd, frequency, chartFre,chartFreName));

        }
    }
};
export default connect(initMapStateToProps,initMapDispatchToProps)(EChartsDemo);
