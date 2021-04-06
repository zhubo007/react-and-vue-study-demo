import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {actionCreator} from './store/index';
import axios from 'axios';
import {Table, Select, Input, Button, message} from 'antd';
import {AddModal} from './component/index';
import moment from 'moment';
import '../../main.css'

const Option = Select.Option;

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
        render: (value: any, rowData: any, index: number) => {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        },
    },
    {
        title: '推荐人',
        dataIndex: 'reference',
        key: 'reference'
    }
];

interface ProductProps {
    handleGetBrandList: (brandList: Object[]) => void;
    brandList: Object[]
}

interface ProductState {
    productName: string,
    brandType: string,
    productList: any[],
    add_visible: boolean,
    edit_visible: boolean,
    selectedRowKeys: string[]
}

interface Values {
    productName: string;
    followTime: string;
    brandType: string;
    startPrice: number;
    expectPrice: number;
    fiveLevel: number;
    productDie: string;
}

class Product extends React.Component<ProductProps, ProductState> {

    constructor(props: ProductProps) {
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
        this.onClickRow = this.onClickRow.bind(this);
    }

    componentDidMount() {
        this.props.handleGetBrandList(this.props.brandList);
        this.request();
    }

    onSelectChange = (selectedRowKeys: string[]) => {
        this.setState({selectedRowKeys});
    };

    request = () => {
        axios.get('/app/product/all', {
            params: {
                productName: this.state.productName,
                brandType: this.state.brandType
            }
        }).then((response: any) => {
            this.setState({productList: response.data})
        }).catch((error) => {
            console.log(error)
        })
    };
    onCreate = (values: Values) => {
        axios.post(`/app/product/add`, values)
            .then(res => {
                console.log('res=>', res);
                this.setState({add_visible: false});
                message.success('新增商品成功');
                this.request();
            }).catch((error) => {
            message.error(error);
        })
    };
    onAddCancel = () => {
        this.setState({add_visible: false})
    };
    onClickRow = (record: any) => {
        return {
            onClick: () => {
                //this.setState({selectedRowKeys: record['productId']});
                alert("双击行")
            },
            onDoubleClick: (event: any) => {
                alert("双击行")
            }
        };
    }
    render() {
        const {brandList} = this.props;
        const {selectedRowKeys} = this.state;
        const rowSelection: Object = {
            selectedRowKeys,
            type: 'checkbox',
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                {
                    key: 'NONE SELECTED',
                    text: '全不选中',
                    onSelect: (changeableRowKeys: any[]) => {
                        this.setState({selectedRowKeys: []});
                    },
                },
            ]
        };
        return (
            <Fragment>
                <Button type="primary" onClick={() => this.setState({add_visible: true})}>新增产品</Button>
                <Button type="primary" onClick={() => this.setState({edit_visible: true})}>编辑产品</Button>
                <Select onChange={(option: any) => {
                    this.setState({brandType: option.value})
                }}
                        labelInValue id='brandInfo' style={{width: 240}}
                        placeholder="请选择品牌">
                    {
                        brandList.map((item: any, index: number) => {
                            return <Option key={index} value={item['boxKey']}>{item['boxText']}</Option>
                        })
                    }
                </Select>
                <Input onChange={(event) => {
                    this.setState({productName: event.target.value})
                }} value={this.state.productName}
                       style={{
                           marginBottom: 8,
                           width: '240px',
                           height: '32px',
                           paddingLeft: '12px',
                           marginRight: '10px',
                           marginLeft: '10px'
                       }} placeholder="请输入搜索内容"/>
                <Button type="primary" onClick={() => this.request()}>搜索</Button>
                <Table columns={columns} dataSource={this.state.productList} rowSelection={rowSelection}
                       rowKey='productId' bordered
                       pagination={{
                           showTotal: (total: number) => `共 ${total} 条`,
                           position: ['bottomRight'],
                           showSizeChanger: true,
                           pageSizeOptions: ['5', '10', '20', '30', '50'],
                           defaultPageSize: 5
                       }}/>
                <AddModal visible={this.state.add_visible} onAddCancel={this.onAddCancel} onCreate={this.onCreate}
                          brandList={brandList}/>
            </Fragment>
        )
    }
}

const initMapStateToProps = (state: any) => {
    return {
        brandList: state.getIn(['common_reducer', 'brandList'])
    }
};
const initMapDispatchToProps = (dispatch: any) => {
    return {
        handleGetBrandList(brandList: Array<any>) {
            if (brandList.length == 0 || typeof brandList.length == 'undefined') {
                dispatch(actionCreator.getBrandList(null, 'brandName'))
            }
        }
    }
};
export default connect(initMapStateToProps, initMapDispatchToProps)(Product);
