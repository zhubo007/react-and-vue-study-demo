import Product from '../../pages/product/index';
import Account from '../../pages/tradeCommon/index';
import BoxItem from '../../pages/combBox/index';
import SystemUser from '../../pages/user/index';
import CashBook from '../../pages/cashBook/index';
export const componentMap: { [key: string]: any } = {
    'Product': Product,
    'Account': Account,
    'BoxItem': BoxItem,
    'SystemUser': SystemUser,
    'CashBook': CashBook
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