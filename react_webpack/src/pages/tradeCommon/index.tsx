import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import '../../main.css';
import {Button, Input, message, Select, Table, Modal} from "antd";
import moment from 'moment'
import {BoxItemObj, ProductObj, TradeCommonEntity, UserEntity} from "../../entity/index";
import axios from "axios";

import AddAccountModal from "./component/addAccountModal";
import {actionCreator} from "../../utils/store/index";

const Option = Select.Option;

export interface TradeCommonProps {
    platformList: BoxItemObj[]
    payWayList: BoxItemObj[]
    productList: ProductObj[]
    userList: UserEntity[]
    handleBoxItemList: (boxItemList: BoxItemObj[], boxName: string) => void
    handleGetUserList: () => void
    handleProductList: () => void
}

interface TradeCommonState {
    tradeCommonList: TradeCommonEntity[]
    selectedRowKeys: string[]
    searchValue: string
    add_edit_visible: boolean
    delete_visible: boolean
    platformId: string
    payWay: string,
    tradeCommon: TradeCommonEntity,
    index: number
}

export const newTradeCommon: TradeCommonEntity = {dealNo: '', productId: NaN, seller: '', buyer: '', payWay: '', payType: '', productNum: NaN, productPrice: NaN,
    totalPrice: NaN, recordTime: '',discountDie: '',platformId: '',brandName: '',brandId: ''};

class TradeCommon extends React.Component<TradeCommonProps, TradeCommonState> {

    constructor(props: TradeCommonProps) {
        super(props);
        this.state = {
            tradeCommonList: [],
            selectedRowKeys: [],
            searchValue: '',
            add_edit_visible: false,
            delete_visible: false,
            platformId: '',
            payWay: '',
            tradeCommon: newTradeCommon,
            index: NaN
        }
    }

    componentDidMount() {
        this.request();
        this.props.handleBoxItemList(this.props.platformList, 'platform');
        this.props.handleBoxItemList(this.props.payWayList, 'payWay');
        this.props.handleProductList()
    }

    request = () => {
        axios.get('/app/tradeCommonController/all', {
            params: {
                platformId: this.state.platformId,
                dealNo: this.state.searchValue,
                payWay: this.state.payWay
            }
        }).then((response: any) => {
            this.setState({tradeCommonList: response.data})
        }).catch((error) => {
            console.log(error)
        })
    };

    onAddCancel = () => {
        this.setState({add_edit_visible: false,tradeCommon: newTradeCommon})
    };

    onSelectChange = (selectedRowKeys: string[], tradeCommon: TradeCommonEntity) => {
        this.setState({selectedRowKeys});
    };
    onCreate = (values: TradeCommonEntity) => {
        let requestURL = `/app/tradeCommonController/add`;
        if (''!=values.dealNo){
            requestURL = `/app/tradeCommonController/update/${values.dealNo}`
        }
        axios.post(requestURL, {...values})
            .then(res => {
                this.setState({add_edit_visible: false});
                message.success('操作成功');
                this.request();
            }).catch((error) => {
            message.error('操作失败');
        })
        this.setState({tradeCommon: newTradeCommon});
    };
    onDelete = () => {
        const keys = this.state.selectedRowKeys;
        if (keys.length == 0) {
            alert("请选择消费记录");
            return;
        }
        keys.forEach((value: string, index: number) => {
            axios.post(`/app/tradeCommonController/delete/${value}`, this.state.selectedRowKeys)
                .then(res => {
                    this.request();
                }).catch((error) => {
                message.error("删除异常");
            })
        })
        message.success('消费记录删除成功');
        this.setState({delete_visible: false})
    };

    addClick = (e:any) => {

    }

    handleUpdate = () => {
        const {selectedRowKeys, tradeCommonList} = this.state;
        if (selectedRowKeys.length == 0){
            message.warn("请选择一条数据进行编辑");
        }else if(selectedRowKeys.length > 1){
            message.warn("一次只能对一条数据进行编辑");
        }else {
            const dealNo = selectedRowKeys[0];
            tradeCommonList.forEach((value: TradeCommonEntity, index: number, array: TradeCommonEntity[]) => {
                if (value.dealNo == dealNo) {
                    this.setState({add_edit_visible: true, tradeCommon: value})
                    return
                }
            })
        }
    }

    render() {
        const {selectedRowKeys, tradeCommonList, add_edit_visible, delete_visible, searchValue, tradeCommon} = this.state;
        const {platformList, payWayList} = this.props;
        const rowSelection: object = {
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
                <Button type="primary" onClick={() => this.setState({tradeCommon: newTradeCommon,add_edit_visible: true})} style={{marginRight: '8px'}}>新增消费记录</Button>
                <Button type="primary" onClick={this.handleUpdate} style={{marginRight: '8px'}}>编辑产品</Button>
                <Button type="primary" danger onClick={() => {
                    if (selectedRowKeys.length == 0){
                        message.warn("请选择一条数据进行删除");
                    }else {
                        this.setState({delete_visible: true})
                    }
                }}
                        style={{marginRight: '8px'}}>删除消费记录</Button>
                <Select onChange={(option: any) => {
                    this.setState({platformId: option.value})
                }}
                        labelInValue id='platformInfo' style={{width: 240, marginRight: '8px'}}
                        placeholder="请选择购买平台">
                    {
                        platformList.map((item: BoxItemObj, index: number) => {
                            return <Option key={index} value={item.boxCode}>{item.boxText}</Option>
                        })
                    }
                </Select>
                <Select onChange={(option: any) => {
                    this.setState({payWay: option.value})
                }}
                        labelInValue id='payWayInfo' style={{width: 240}}
                        placeholder="请选择支付方式">
                    {
                        payWayList.map((item: BoxItemObj, index: number) => {
                            return <Option key={index} value={item.boxCode}>{item.boxText}</Option>
                        })
                    }
                </Select>
                <Input onChange={(event) => {
                    this.setState({searchValue: event.target.value})
                }} value={searchValue}
                       style={{
                           marginBottom: 8,
                           width: '240px',
                           height: '32px',
                           paddingLeft: '12px',
                           marginRight: '8px',
                           marginLeft: '8px'
                       }} placeholder="请输入搜索内容"/>
                <Button type="primary" onClick={() => this.request()}>搜索</Button>
                <h1>Hello, This is 记账功能页面</h1>
                <Table dataSource={tradeCommonList} rowSelection={rowSelection}
                       rowKey='dealNo' bordered
                       pagination={{
                           showTotal: (total: number) => `共 ${total} 条`,
                           position: ['bottomRight'],
                           showSizeChanger: true,
                           pageSizeOptions: ['5', '15', '30', '40', '50'],
                           defaultPageSize: 5
                       }}>
                    <Table.Column title={"交易单号"} dataIndex={"dealNo"} key={"dealNo"}/>
                    <Table.Column title={"商品ID"} dataIndex={"productId"} key={"productId"} className={'hideColumn'}/>
                    <Table.Column title={"商品名称"} dataIndex={"productName"} key={"productName"}/>
                    <Table.Column title={"品牌名称"} dataIndex={"brandName"} key={"brandName"}/>
                    <Table.Column title={"购买者ID"} dataIndex={"buyer"} key={"buyer"} className={'hideColumn'}/>
                    <Table.Column title={"购买者"} dataIndex={"buyerName"} key={"buyerName"}/>
                    <Table.Column title={"购买平台ID"} dataIndex={"platformId"} key={"platformId"}
                                  className={'hideColumn'}/>
                    <Table.Column title={"购买平台"} dataIndex={"platformName"} key={"platformName"}/>
                    <Table.Column title={"卖家ID"} dataIndex={"seller"} key={"seller"} className={'hideColumn'}/>
                    <Table.Column title={"卖家"} dataIndex={"sellerName"} key={"sellerName"}/>
                    <Table.Column title={"支付方式ID"} dataIndex={"payWay"} key={"payWay"} className={'hideColumn'}/>
                    <Table.Column title={"支付方式"} dataIndex={"payWayName"} key={"payWayName"}/>
                    <Table.Column title={"商品数量"} dataIndex={"productNum"} key={"productNum"}/>
                    <Table.Column title={"商品单价"} dataIndex={"productPrice"} key={"productPrice"}/>
                    <Table.Column title={"实付款"} dataIndex={"totalPrice"} key={"totalPrice"}/>
                    <Table.Column title={"记账日期"} dataIndex={"recordTime"} key={"recordTime"}
                                  render={(value: string, rowData: TradeCommon, index: number) => {
                                      return moment(value).format('YYYY-MM-DD HH:mm:ss');
                                  }}/>
                </Table>
                {add_edit_visible&&<AddAccountModal visible={add_edit_visible} onAddCancel={this.onAddCancel} props={this.props} onCreate={this.onCreate} tradeCommon={tradeCommon}/>}
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

const mapStateToProps = (state: any) => {
    return {
        platformList: state.getIn(['common_reducer', 'platformList']).toJS(),
        payWayList: state.getIn(['common_reducer', 'payWayList']).toJS(),
        productList: state.getIn(['common_reducer', 'productList']).toJS(),
        userList: state.getIn(['common_reducer', 'userList']).toJS()
    }
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        handleBoxItemList(boxItemList: BoxItemObj[], boxName: string) {
            if (boxItemList.length == 0) {
                dispatch(actionCreator.getBoxItemList(null, boxName))
            }
        },
        handleProductList() {
            dispatch(actionCreator.getProductList())
        },
        handleGetUserList() {
            dispatch(actionCreator.getUserList())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeCommon);