import TableDemo from '../../pages/user/index';
import ChartJSDemo from '../../pages/chartjs-demo/index';
import EChartsDemo from '../../pages/echarts-demo/index';
export const componentMap = {
    'TableDemo':TableDemo,
    'ChartJSDemo':ChartJSDemo,
    'EChartsDemo':EChartsDemo,
};

export const menus = [
    {
        title: '首页',
        icon: 'home',
        key: 'MarketValue',
    },
    {
        title: '图表组件',
        icon: 'bars',
        key: 'industry',
        subs: [
            {key: 'ChartJSDemo', title: 'charts.js示例', icon: '',},
            {key: 'EChartsDemo', title: 'Echarts示例', icon: '',},
            {key: 'TableDemo', title: 'antd-table示例', icon: '',},
        ]
    },
    {
        title: '输入组件',
        icon: 'edit',
        key: '/home/entry',
        subs: [
            {
                key: '/home/entry/form',
                title: '表单',
                icon: '',
                subs: [
                    {key: '/home/entry/form/basic-form', title: '基础表单', icon: ''},
                    {key: '/home/entry/form/step-form', title: '分步表单', icon: ''}
                ]
            },
            {key: '/home/entry/upload', title: '上传', icon: ''},
        ]
    }
];

export const Change_Selected_Keys = 'change_selected_keys';
export const Change_Open_Keys = 'change_open_keys';
export const Change_Keys = 'change_keys';
export const Add_RM_Tab_Panes = 'add_rm_tab_panes';
export const Change_Active_Key = 'change_active_key';
export const Change_Collapsed = 'change_collapsed';