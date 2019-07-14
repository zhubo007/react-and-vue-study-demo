import React, { PureComponent } from 'react';
import {connect } from 'react-redux';
import store from '../../../store/index'
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import { changeOption } from '../store/actionCreator';

class Chart extends PureComponent{

    render(){
        const { option } = this.props;
        return (
            <div className='examples'>
                <div className='parent'>
                    <ReactEcharts option={option.toJS()}
                                  notMerge={true} lazyUpdate={true}
                                  style={{height: '400px', width: '100%'}} ref='echarts_react' />
                </div>
            </div>
        );
    }
}

const initMapStateToProps = (state) => {
    return {
        option: state.getIn(['macro_monitor','option'])
    }
};
const initMapDispatchToProps = (dispatch) => {
    return {

    }
};
export default connect(initMapStateToProps, initMapDispatchToProps)(Chart);