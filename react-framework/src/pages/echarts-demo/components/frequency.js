import React, {Fragment, PureComponent} from 'react';
import {connect } from 'react-redux';
import { Select } from 'antd';
import { actionCreator } from '../store/index';

const Option = Select.Option;
const data=[{title:"月",value:3},{title:"日",value:1}];

class Frequency extends PureComponent {
    render () {
        const { frequency,frequencyName, freKey, freLabel, handleChange } = this.props;
        return (
            <Select id='frequency' className='frequency' size='default' onChange={handleChange} value={ {key:freKey, label:freLabel} }
                    labelInValue style={{ width: 120 }} placeholder="请选择周期" optionFilterProp="children">
                {
                    frequency === 1 ? this.getOption() : <Option key={frequency} value={frequency} >{frequencyName}</Option>
                }
            </Select>
        )
    }
    getOption() {
        return (
            data.map((item)=>{
                return <Option key={item.value} value={item.value} >{item.title}</Option>
            })
        )
    }
}
const initMapStateToProps = (state) => {
    return {
        frequency: state.getIn(['macro_monitor', 'frequency']),
        frequencyName: state.getIn(['macro_monitor', 'frequencyName']),
        freKey: state.getIn(['macro_monitor', 'freKey']),
        freLabel: state.getIn(['macro_monitor', 'freLabel'])
    }
};
const initMapDispatchToProps = (dispatch) => {
    return {
        handleChange(value){
            const freKey = value.key;
            const freLabel = value.label;
            dispatch(actionCreator.changeFrequencyValue(freKey, freLabel));
        }
    }
};
export default connect(initMapStateToProps,initMapDispatchToProps)(Frequency);