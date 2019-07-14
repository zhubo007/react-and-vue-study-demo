import React, { PureComponent } from 'react';
import {connect } from 'react-redux';
import { Select } from 'antd';
import { actionCreator } from '../store/index';

const Option = Select.Option;

class IndexSelect extends PureComponent {

    render(){
        const { list, handleChange, indexCode, indexName, option } = this.props;
        return (
            <Select labelInValue id='indexInfo' className='indexInfo' size='default'
                    showSearch style={{ width: 320 }}
                    placeholder="请选择一个指数"
                    optionFilterProp="children"
                    onChange={(value) => handleChange(value, option)} value={ {key:indexCode, label:indexName} }>
                {
                    list.map((item,index) => (
                        <Option key={index} value={item.get('INDEXCODE')}>{item.get('INDEXNAMESOURCE')}</Option>
                    ))
                }
            </Select>
        );
    }
    componentDidMount() {
        this.props.addIndexOption(this.props.option);
    }
}

const initMapStateToProps = (state) => {
    return {
        list: state.getIn(['macro_monitor','indexInfo']),
        indexCode:state.getIn(['macro_monitor','indexCode']),
        indexName: state.getIn(['macro_monitor','indexName']),
        option: state.getIn(['macro_monitor','option'])
    }
};
const initMapDispatchToProps = (dispatch) => {
    return {
        addIndexOption(option){
            dispatch(actionCreator.addIndexOption(option));
        },
        handleChange(value,option){
            const indexCode = value.key;
            const indexName = value.label;
            if (indexCode !== 0 || indexCode !=='') {
                dispatch(actionCreator.changeIndexOption(indexCode, indexName));
                dispatch(actionCreator.setIndexCycleInfo(indexCode,indexName, option));
            }
        }
    }
};
export default connect(initMapStateToProps, initMapDispatchToProps)(IndexSelect);

