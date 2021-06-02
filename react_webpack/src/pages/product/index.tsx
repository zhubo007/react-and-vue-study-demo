import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {actionCreator} from './store/index'
import axios from 'axios'
import {Table, Select, Input, Button, message, Modal} from 'antd'
import {AddModal} from './component/index'
import moment from 'moment'
import '../../main.css'
import {ProductObj, BrandObj} from "../../entity/index"
import {number} from "prop-types";

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
        render: (value: string, rowData: ProductObj, index: number) => {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        },
    },
    {
        title: '推荐人',
        dataIndex: 'reference',
        key: 'reference'
    }
];
//不使用immutable brandList类型为BrandObj[]，使用immutable后brandList类型为List<BrandObj>
interface ProductProps {
    handleGetBrandList: (brandList: BrandObj[]) => void;
    brandList: BrandObj[];
}

interface ProductState {
    productName: string,
    brandType: string,
    productList: ProductObj[],
    add_edit_visible: boolean,
    delete_visible: boolean,
    selectedRowKeys: number[],
    productId: number,
    product: ProductObj,
}

export const newProduct: ProductObj = {productId: NaN, productName: '', followTime: '', expectPrice: NaN, startPrice: NaN, brandType: '', fiveLevel: NaN, productDie: '', brandName: '', reference: ''};

class Product extends React.Component<ProductProps, ProductState> {

    constructor(props: ProductProps) {
        super(props);
        this.state = {
            productName: '',
            brandType: '',
            productList: [],
            add_edit_visible: false,
            delete_visible: false,
            selectedRowKeys: [],
            productId: NaN,
            product: newProduct
        };
        this.onAddCancel = this.onAddCancel.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onClickRow = this.onClickRow.bind(this);
    }

    componentDidMount() {
        this.props.handleGetBrandList(this.props.brandList);
        this.request();
    }

    onSelectChange = (selectedRowKeys: number[]) => {
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
    onCreate = (values: ProductObj) => {
        let requestUrl = `/app/product/add`;
        if (!isNaN(values.productId)){
            requestUrl = `/app/product/update/${values.productId}`;
        }
        axios.post(requestUrl, {...values})
            .then(res => {
                this.setState({add_edit_visible: false});
                message.success('操作成功');
                this.request();
            }).catch((error) => {
                message.error('操作失败');
            })
    };
    onDelete = () => {
        const keys = this.state.selectedRowKeys;
        if (keys.length == 0 ){
            alert("请选择消费记录");
            return;
        }
        keys.forEach((value: number, index: number) => {
            axios.post(`/app/product/delete/${value}`,{})
                .then(res => {
                    this.request();
                }).catch((error) => {
                message.error("删除异常");
            })
        })
        message.success('产品删除成功');
        this.setState({delete_visible: false})
    };
    onAddCancel = () => {
        this.setState({add_edit_visible: false})
    };
    onClickRow = (record: ProductObj) => {
        return {
            onClick: () => {
                alert("双击行")
            },
            onDoubleClick: (event: any) => {
                console.log(event)
            }
        };
    };
    render() {
        const {brandList} = this.props;
        const {selectedRowKeys, delete_visible, add_edit_visible, productList, productName, product} = this.state;
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
                    onSelect: (changeableRowKeys: string[]) => {
                        this.setState({selectedRowKeys: []});
                    },
                },
            ]
        };
        return (
            <Fragment>
                <Button type="primary" onClick={() => this.setState({add_edit_visible: true, product: newProduct})} style={{marginRight: '8px'}}>新增产品</Button>
                <Button type="primary" onClick={() => {
                    if (selectedRowKeys.length == 0){
                        message.warn("请选择一条数据进行编辑");
                    }else if(selectedRowKeys.length > 1){
                        message.warn("一次只能对一条数据进行编辑");
                    }else {
                        const productId = selectedRowKeys[0];
                        productList.forEach((value: ProductObj, index: number, array: ProductObj[]) => {
                            if (value.productId == productId) {
                                this.setState({add_edit_visible: true, product: value})
                                return
                            }
                        })
                    }
                }} style={{marginRight: '8px'}}>编辑产品</Button>

                <Button type="primary" danger onClick={() => {
                    if (selectedRowKeys.length == 0){
                        message.warn("请选择一条数据进行删除");
                    }else {
                        this.setState({delete_visible: true})
                    }
                }} style={{marginRight: '8px'}}>删除产品</Button>

                <Select onChange={(option: any) => {this.setState({brandType: option.value})}} labelInValue id='brandInfo' style={{width: 240}} placeholder="请选择品牌">
                    {
                        brandList.map((item: BrandObj, index: number) => {
                            return <Option key={index} value={item.boxCode}>{item.boxText}</Option>
                        })
                    }
                </Select>
                <Input onChange={(event) => {this.setState({productName: event.target.value})}} value={productName}
                       style={{marginBottom: 8, width: '240px', height: '32px', paddingLeft: '12px', marginRight: '8px', marginLeft: '8px'}} placeholder="请输入搜索内容"/>
                <Button type="primary" onClick={() => this.request()}>搜索</Button>
                <Table columns={columns} dataSource={productList} rowSelection={rowSelection}
                       rowKey='productId' bordered
                       pagination={{
                           showTotal: (total: number) => `共 ${total} 条`,
                           position: ['bottomRight'],
                           showSizeChanger: true,
                           pageSizeOptions: ['5', '10', '20', '30', '50'],
                           defaultPageSize: 5
                       }}/>
                {add_edit_visible&&<AddModal add_edit_visible={add_edit_visible} onAddCancel={this.onAddCancel} onCreate={this.onCreate} brandList={brandList} product={product}/>}
                <Modal
                    title="系统提醒"
                    visible={delete_visible}
                    onOk={this.onDelete}
                    onCancel={() => this.setState({delete_visible: false})}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>确认删除选择的消费记录？</p>
                </Modal>
            </Fragment>
        )
    }
}
//1. initMapStateToProps  initMapDispatchToProps也可以用在无状态组件当中
//2. initMapStateToProps不使用immutable获取值的方式为 return {brandList: state.common_reducer.brandList}
const initMapStateToProps = (state: any) => {
    return {
        brandList: state.getIn(['product_reducer','brandList']).toJS()
    }
};
const initMapDispatchToProps = (dispatch: any) => {
    return {
        handleGetBrandList(brandList: BrandObj[]) {
            // 简单的值，不需要发请求的值可以通过简单的dispatch(action)方式更改store中的值
            // const action = {type: "add_product", value: ""};
            // dispatch(action)
            if (brandList.length==0){
                dispatch(actionCreator.getBrandList(null, 'brandName'))
            }
        }
    }
};
export default connect(initMapStateToProps, initMapDispatchToProps)(Product);
