import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {actionCreator} from './store/index'
import axios from 'axios'
import {Table, Select, Input, Button, message, Modal} from 'antd'
import {AddModal} from './component/index'
import '../../main.css'
import { BoxItemObj} from "../../entity/index"

const Option = Select.Option;

const columns = [
    {
        title: '编号',
        dataIndex: 'boxId',
        key: 'boxId',
    },
    {
        title: '字典项父级代码',
        dataIndex: 'boxCodeP',
        key: 'boxCodeP'
    },
    {
        title: '字典项代码',
        dataIndex: 'boxCode',
        key: 'boxCode'
    },
    {
        title: '字典项名称',
        dataIndex: 'boxText',
        key: 'boxText'
    },
    {
        title: '排序',
        dataIndex: 'sort',
        key: 'sort'
    }
];
//不使用immutable brandList类型为BrandObj[]，使用immutable后brandList类型为List<BrandObj>
interface BoxItemProps {
    handleGetBrandList: (brandList: BoxItemObj[]) => void;
    brandList: BoxItemObj[];
}

interface BoxItemState {
    boxCodeP: string,
    boxItemList: BoxItemObj[],
    add_edit_visible: boolean,
    delete_visible: boolean,
    selectedRowKeys: number[],
    boxId: number,
    boxItem: BoxItemObj,
}

export const newBoxItem: BoxItemObj = {boxId: NaN, sort: NaN, boxCode: '', boxText: '', boxCodeP: ''};

class BoxItem extends React.Component<BoxItemProps, BoxItemState> {

    constructor(props: BoxItemProps) {
        super(props);
        this.state = {
            boxCodeP:'',
            boxItemList: [],
            add_edit_visible: false,
            delete_visible: false,
            selectedRowKeys: [],
            boxId: NaN,
            boxItem: newBoxItem
        };
        this.onAddCancel = this.onAddCancel.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onClickRow = this.onClickRow.bind(this);
    }

    componentDidMount() {
        this.request();
    }

    onSelectChange = (selectedRowKeys: number[]) => {
        this.setState({selectedRowKeys});
    };

    request = () => {
        axios.get('/app/boxItem/all', {
            params: {
                boxCodeP: this.state.boxCodeP
            }
        }).then((response: any) => {
            this.setState({boxItemList: response.data})
        }).catch((error) => {
            console.log(error)
        })
    };
    onCreate = (values: BoxItemObj) => {
        let requestUrl = `/app/boxItem/add`;
        console.log(values.boxId)
        if (values.boxId != null && values.boxId != undefined && !isNaN(values.boxId) ){
            requestUrl = `/app/boxItem/update/${values.boxId}`;
        }
        console.log(requestUrl)
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
            axios.post(`/app/boxItem/delete/${value}`,{})
                .then(res => {
                    this.request();
                }).catch((error) => {
                message.error("删除异常");
            })
        });
        message.success('类别删除成功');
        this.setState({delete_visible: false})
    };
    onAddCancel = () => {
        this.setState({add_edit_visible: false})
    };
    onClickRow = (record: BoxItemObj) => {
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
        const {selectedRowKeys, delete_visible, add_edit_visible, boxItemList, boxCodeP, boxItem} = this.state;
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
                <Button type="primary" onClick={() => this.setState({add_edit_visible: true, boxItem: newBoxItem })} style={{marginRight: '8px'}}>新增字典项</Button>
                <Button type="primary" onClick={() => {
                    if (selectedRowKeys.length == 0){
                        message.warn("请选择一条数据进行编辑");
                    }else if(selectedRowKeys.length > 1){
                        message.warn("一次只能对一条数据进行编辑");
                    }else {
                        const boxId = selectedRowKeys[0];
                        boxItemList.forEach((value: BoxItemObj, index: number, array: BoxItemObj[]) => {
                            if (value.boxId == boxId) {
                                this.setState({add_edit_visible: true, boxItem: value});
                                return
                            }
                        })
                    }
                }} style={{marginRight: '8px'}}>编辑字典项</Button>

                <Button type="primary" danger onClick={() => {
                    if (selectedRowKeys.length == 0){
                        message.warn("请选择一条数据进行删除");
                    }else {
                        this.setState({delete_visible: true})
                    }
                }} style={{marginRight: '8px'}}>删除字典项</Button>

                <Input onChange={(event) => {this.setState({boxCodeP: event.target.value})}} value={boxCodeP}
                       style={{marginBottom: 8, width: '240px', height: '32px', paddingLeft: '12px', marginRight: '8px', marginLeft: '8px'}} placeholder="请输入搜索内容"/>
                <Button type="primary" onClick={() => this.request()}>搜索</Button>
                <Table columns={columns} dataSource={boxItemList} rowSelection={rowSelection}
                       rowKey='boxId' bordered
                       pagination={{
                           showTotal: (total: number) => `共 ${total} 条`,
                           position: ['bottomRight'],
                           showSizeChanger: true,
                           pageSizeOptions: ['5', '10', '20', '30', '50'],
                           defaultPageSize: 5
                       }}/>
                {add_edit_visible&&<AddModal add_edit_visible={add_edit_visible} onAddCancel={this.onAddCancel} onCreate={this.onCreate} boxItem={boxItem}/>}
                <Modal
                    title="系统提醒"
                    visible={delete_visible}
                    onOk={this.onDelete}
                    onCancel={() => this.setState({delete_visible: false})}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>确认删除选择的该类别？</p>
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
        handleGetBrandList(brandList: BoxItemObj[]) {
            // 简单的值，不需要发请求的值可以通过简单的dispatch(action)方式更改store中的值
            // const action = {type: "add_product", value: ""};
            // dispatch(action)
            if (brandList.length==0){
                dispatch(actionCreator.getBrandList(null, 'brandName'))
            }
        }
    }
};
export default connect(initMapStateToProps, initMapDispatchToProps)(BoxItem);
