import React, { PureComponent, Fragment } from 'react';
import {connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
const Default_Option = {
    color: ['#3398DB'],
    legend:{
        orient: 'horizontal',
        x:"center",
        y:"bottom",
        data:["2018年月度收益"]
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {type: 'cross'}
    },
    xAxis : {
        name:"日期",
        type: 'category',
        position: 'bottom',//自定义X轴的位置
        boundaryGap: true,//X轴是否以零为起点
        axisTick: {
            alignWithLabel: true
        },
        data: ['2018-01','2018-02','2018-03','2018-04','2018-05','2018-06',
            '2018-07','2018-08','2018-09','2018-010','2018-011','2018-012']
    },
    yAxis:{
        name:"指数值",
        type : 'value',
        axisLabel : {
            formatter: '{value}'
        },
        boundaryGap:true,
        scale: true
    },
    series:{
        name:"2018年月度收益",
        type:'bar',
        data:[9000,8000,7500,1200,2000,12000,
            9000,6500,3000,15000,7000,1200],
        tooltip:{
            trigger:"axis"
        }
    }
};
class EChartsDemo extends PureComponent{

    render(){
        return (
            <Fragment>
                <ReactEcharts option={Default_Option}
                              notMerge={true} lazyUpdate={true}
                              style={{height: '400px', width: '100%'}} ref='echarts_react' />
            </Fragment>
        )
    }


}

const mapState = (state) => {
    return {
    }
};
const mapDispatch = (dispatch) => {
    return {
    }
};
export default connect(mapState,mapDispatch)(EChartsDemo);
