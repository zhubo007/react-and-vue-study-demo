
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
//import axios from './../../axios/index';
import axios from 'axios';
import { Table, Card, Select, Input, Button, message } from 'antd';
import { fromJS } from 'immutable';
import { AddModal } from './component';
import moment from 'moment';
import '../../main.css'

const Option = Select.Option;
const Search = Input.Search;
const { Column } = Table;

const columns = [
    {
        title: '编号',
        dataIndex: 'productId',
        key: 'productId',
        className: 'hideColumn'
    },
    {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName'
    },
    {
        title: '初始价格',
        dataIndex: 'startPrice',
        key: 'startPrice'
    },
    {
        title: '预期价位',
        dataIndex: 'expectPrice',
        key: 'expectPrice'
    },
    {
        title: '产品品牌',
        dataIndex: 'brandName',
        key: 'brandName'
    },
    {
        title: '关注时间',
        dataIndex: 'followTime',
        key: 'followTime',
        render: (value, rowData, index) => {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');;
        },
    },
    {
        title: '推荐人',
        dataIndex: 'reference',
        key: 'reference'
    }
];

class Product extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            brandType: '',
            productList: [],
            add_visible: false,
            edit_visible: false,
            selectedRowKeys: []
        };
        this.onAddCancel = this.onAddCancel.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    componentDidMount() {
        this.props.handleGetBrandList(this.props.brandList);
        this.request();
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    request = () => {
        axios.get('/app/product/all', { params: { productName: this.state.productName, brandType: this.state.brandType } }).then((response) => {
            this.setState({ productList: response.data })
        }).catch((error) => {
            console.log(response)
        })
    }
    onCreate = (values) => {
        axios.post(`/app/product/add`, values)
            .then(res => {
                console.log('res=>', res);
                this.setState({ add_visible: false })
                message.success('新增商品成功');
            }).catch((error) => {
                message.error(error);
                console.log(response)
            })
    }
    onAddCancel = () => {
        this.setState({ add_visible: false })
    }

    render() {
        const { brandList } = this.props;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            type: 'checkbox',
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                //Table.SELECTION_NONE,
                {
                    key: 'NONE SELECTED',
                    text: '全不选中',
                    onSelect: changableRowKeys => {
                        this.setState({ selectedRowKeys: [] });
                    },
                },
            ]
        };
        return (
            <Fragment>
                <Button type="primary" onClick={() => this.setState({ add_visible: true })}>新增产品</Button>
                <Button type="primary" onClick={() => this.setState({ edit_visible: true })}>编辑产品</Button>
                <Select onChange={(option) => { this.setState({ brandType: option.value }) }}
                    labelInValue id='brandInfo' size='default' style={{ width: 240 }}
                    placeholder="请选择品牌">
                    {
                        brandList.map((item, index) => {
                            return <Option key={index} value={item.get('boxKey')}>{item.get('boxText')}</Option>
                        })
                    }
                </Select>
                <Input onChange={(event) => { this.setState({ productName: event.target.value }) }} value={this.state.productName}
                    style={{ marginBottom: 8, width: '240px', height: '32px', paddingLeft: '12px', marginRight: '10px', marginLeft: '10px' }} placeholder="请输入搜索内容" />
                <Button type="primary" onClick={() => this.request()}>搜索</Button>
                <Table columns={columns} dataSource={this.state.productList} rowSelection={rowSelection} rowKey='productId' bordered
                    pagination={{ showTotal: total => `共 ${total} 条`, position: 'bottom', showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '30', '50'], defaultPageSize: 5, }} />
                <AddModal visible={this.state.add_visible} onAddCancel={this.onAddCancel} onCreate={this.onCreate} brandList={brandList} />
            </Fragment>
        )
    }
}

const initMapStateToProps = (state) => {
    return {
        brandList: state.getIn(['common_reducer', 'brandList'])
    }
};
const initMapDispatchToProps = (dispatch) => {
    return {
        handleGetBrandList(brandList) {
            if (brandList.size <= 0) {
                dispatch(actionCreator.getBrandList(null, 'brandName'))
            }
        }
    }
};
export default connect(initMapStateToProps, initMapDispatchToProps)(Product);
