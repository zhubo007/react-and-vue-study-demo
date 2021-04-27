import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import '../../main.css';
import {Button, Input, message, Select, Table} from "antd";
import moment from 'moment'
import {BoxItemEntity, ProductObj, TradeCommonEntity} from "../../entity/index";
import axios from "axios";
import AddAccountModal from "./component/addAccountModal";
import {actionCreator} from "../../utils/store/index";

const Option = Select.Option;

interface TradeCommonProps {
    platformList: BoxItemEntity[]
    payWayList: BoxItemEntity[]
    productList: ProductObj[]
    handleBoxItemList: (boxItemList: BoxItemEntity[], boxName: string) => void
    handleProductList: () => void
}

interface TradeCommonState {
    tradeCommonList: TradeCommonEntity[]
    selectedRowKeys: string[]
    searchValue: string
    add_visible: boolean
    platformId: string
    payWay: string
}

class TradeCommon extends React.Component<TradeCommonProps, TradeCommonState> {

    constructor(props: TradeCommonProps) {
        super(props);
        this.state = {
            tradeCommonList: [],
            selectedRowKeys: [],
            searchValue: '',
            add_visible: false,
            platformId: '',
            payWay: ''
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
        this.setState({add_visible: false})
    };

    onSelectChange = (selectedRowKeys: string[]) => {
        this.setState({selectedRowKeys});
    };
    onCreate = (values: any) => {
        axios.post(`/app/tradeCommonController/add`, values)
            .then(res => {
                console.log('res=>', res);
                this.setState({add_visible: false});
                message.success('新增商品成功');
                this.request();
            }).catch((error) => {
            message.error(error);
        })
    };

    render() {
        const {selectedRowKeys} = this.state;
        const {platformList, payWayList, productList} = this.props;
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
                <Button type="primary" onClick={() => this.setState({add_visible: true})}
                        style={{marginRight: '8px'}}>新增消费记录</Button>
                <Select onChange={(option: any) => {
                    this.setState({platformId: option.value})
                }}
                        labelInValue id='platformInfo' style={{width: 240, marginRight: '8px'}}
                        placeholder="请选择购买平台">
                    {
                        platformList.map((item: BoxItemEntity, index: number) => {
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
                        payWayList.map((item: BoxItemEntity, index: number) => {
                            return <Option key={index} value={item.boxCode}>{item.boxText}</Option>
                        })
                    }
                </Select>
                <Input onChange={(event) => {
                    this.setState({searchValue: event.target.value})
                }} value={this.state.searchValue}
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
                <Table dataSource={this.state.tradeCommonList} rowSelection={rowSelection}
                       rowKey='dealNo' bordered
                       pagination={{
                           showTotal: (total: number) => `共 ${total} 条`,
                           position: ['bottomRight'],
                           showSizeChanger: true,
                           pageSizeOptions: ['5', '10', '20', '30', '50'],
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
                <AddAccountModal visible={this.state.add_visible} onAddCancel={this.onAddCancel}
                                 onCreate={this.onCreate}/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        platformList: state.getIn(['common_reducer', 'platformList']).toJS(),
        payWayList: state.getIn(['common_reducer', 'payWayList']).toJS(),
        productList: state.getIn(['common_reducer', 'productList']).toJS()
    }
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        handleBoxItemList(boxItemList: BoxItemEntity[], boxName: string) {
            if (boxItemList.length == 0) {
                dispatch(actionCreator.getBoxItemList(null, boxName))
            }
        },
        handleProductList() {
            dispatch(actionCreator.getProductList())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeCommon);