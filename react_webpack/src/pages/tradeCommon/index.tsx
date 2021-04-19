import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import '../../main.css';
import {Button, Input, message, Table} from "antd";
import {ProductObj, TradeCommonEntity} from "../../entity/index";
import axios from "axios";
import AddAccountModal from "./component/addAccountModal";



interface TradeCommonProps {
}

interface TradeCommonState {
    tradeCommonList: TradeCommonEntity[]
    selectedRowKeys: string[]
    searchValue: string
    add_visible: boolean
}

class TradeCommon extends React.Component<TradeCommonProps, TradeCommonState> {

    constructor(props: TradeCommonProps) {
        super(props);
        this.state = {
            tradeCommonList: [],
            selectedRowKeys: [],
            searchValue: '',
            add_visible: false
        }
    }

    componentDidMount() {
        this.request();
    }

    request = () => {
        axios.get('/app/tradeCommonController/all', {
            params: {
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
    onCreate = (values: ProductObj) => {
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
                <Button type="primary" onClick={() => this.setState({add_visible: true})} style={{marginRight: '8px'}}>新增产品</Button>
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
                    <Table.Column title={"卖家"} dataIndex={"seller"} key={"seller"}/>
                    <Table.Column title={"购买者"} dataIndex={"buyer"} key={"buyer"}/>
                    <Table.Column title={""} dataIndex={"payWay"} key={"payWay"} className={'hideColumn'}/>
                    <Table.Column title={"付款方式"} dataIndex={"payType"} key={"payType"}/>
                    <Table.Column title={"商品数量"} dataIndex={"productNum"} key={"productNum"}/>
                    <Table.Column title={"商品单价"} dataIndex={"productPrice"} key={"productPrice"}/>
                    <Table.Column title={"总价"} dataIndex={"totalPrice"} key={"totalPrice"}/>
                    <Table.Column title={"记账日期"} dataIndex={"recordTime"} key={"recordTime"}/>
                </Table>
                <AddAccountModal visible={this.state.add_visible} onAddCancel={this.onAddCancel} onCreate={this.onCreate}/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {}
};
const mapDispatchToProps = (dispatch: any) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeCommon);