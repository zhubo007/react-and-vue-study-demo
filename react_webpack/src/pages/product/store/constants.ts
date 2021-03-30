export const Auth_Option = 'auth_option';
export const BOX_BRAND_LIST_OPTION = 'box_brand_option';
export const Add_Index_Option = 'add_index_option';
export const Change_Index_Option = 'change_index_option';
export const Set_StartEnd_Time = 'set_startend_time';
export const Change_Frequency_Value = 'change_frequency_value';
export const Change_Time = 'change_time';
export const frequencyObj = {1:"日",2:"周",3:"月",4:"季度",5:"半年",6:"年"};

export const Default_Option = {
    color: ['#3398DB'],
    legend:{
        orient: 'horizontal',
        x:"center",
        y:"bottom",
        data:[]
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
        data: []
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
        name:"",
            type:'bar',
            data:[],
            tooltip:{
            trigger:"axis"
        }
    }
};