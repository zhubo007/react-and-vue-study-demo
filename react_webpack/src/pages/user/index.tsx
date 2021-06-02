import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import '../../main.css';
import {Button, Input, message, Modal, Select, Table} from "antd";
import moment from 'moment'
import {UserEntity} from "../../entity/index";
import axios from "axios";
import {actionCreator} from "../../utils/store/index";
import {AddSystemUserModel} from "../user/component/index";

const Option = Select.Option;
const columns = [
    {title: '编号', dataIndex: 'userId', key: 'userId', className: 'hideColumn'},
    {title: '产品名称', dataIndex: 'userName', key: 'userName'},
    {title: '初始价格', dataIndex: 'realName', key: 'realName'},
    {title: '所在平台', dataIndex: 'platformId', key: 'platformId'},
    {title: '年龄', dataIndex: 'age', key: 'age'},
    {title: '性别', dataIndex: 'gender', key: 'gender'},
    {title: '最近登录时间', dataIndex: 'lastLoginTime', key: 'lastLoginTime'},
    {title: '是否启用', dataIndex: 'isActive', key: 'isActive'},
    {title: '用户类型', dataIndex: 'buyerOrSeller', key: 'buyerOrSeller'},

];

export interface SystemUserProps {
}

interface SystemUserState {
    userName: string,
    buyer_or_seller: number,
    sysUserList: UserEntity[],
    add_edit_visible: boolean,
    delete_visible: boolean,
    selectedRowKeys: string[],
    userId: string,
    userData: UserEntity,
}
export const newUserEntity: UserEntity = {userId: '', userName: '', realName: '', age: NaN, gender: '', lastLoginTime: '', isActive: NaN, buyerOrSeller: NaN, platformId: ''};

class SystemUser extends React.Component<SystemUserProps, SystemUserState> {

    constructor(props: SystemUserProps) {
        super(props);
        this.state = {
            userName: '',
            buyer_or_seller: NaN,
            sysUserList: [],
            add_edit_visible: false,
            delete_visible: false,
            selectedRowKeys: [],
            userId: '',
            userData: newUserEntity
        };
        this.onAddCancel = this.onAddCancel.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    componentDidMount() {
        this.request();
    }

    request = () => {
        axios.get('/app/user/all', {
            params: {
                productName: this.state.userName
            }
        }).then((response: any) => {
            this.setState({sysUserList: response.data})
        }).catch((error) => {
            console.log(error)
        })
    };

    onAddCancel = () => {
    };

    onSelectChange = (selectedRowKeys: string[]) => {
    };
    onCreate = (values: any) => {
    };
    onDelete = () => {
        const keys = this.state.selectedRowKeys;
        if (keys.length == 0 ){
            alert("请选择消费记录");
            return;
        }
        keys.forEach((value: string, index: number) => {
            axios.post(`/app/user/delete/${value}`,{})
                .then(res => {
                    this.request();
                }).catch((error) => {
                message.error("删除异常");
            })
        })
        message.success('用户信息删除成功');
        this.setState({delete_visible: false})
    };
    render() {
        const {selectedRowKeys, delete_visible, add_edit_visible, sysUserList, userName, userData} = this.state;
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
                <Button type="primary" onClick={() => this.setState({add_edit_visible: true, userData: newUserEntity})} style={{marginRight: '8px'}}>新增产品</Button>
                <Button type="primary" onClick={() => {
                    if (selectedRowKeys.length == 0){
                        message.warn("请选择一条数据进行编辑");
                    }else if(selectedRowKeys.length > 1){
                        message.warn("一次只能对一条数据进行编辑");
                    }else {
                        const userId = selectedRowKeys[0];
                        sysUserList.forEach((value: UserEntity, index: number, array: UserEntity[]) => {
                            if (value.userId == userId) {
                                this.setState({add_edit_visible: true, userData: value})
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

                <Input onChange={(event) => {this.setState({userName: event.target.value})}} value={userName} placeholder="请输入搜索内容"
                       style={{marginBottom: 8, width: '240px', height: '32px', paddingLeft: '12px', marginRight: '8px', marginLeft: '8px'}}/>
                <Button type="primary" onClick={() => this.request()}>搜索</Button>
                <Table columns={columns} dataSource={sysUserList} rowSelection={rowSelection}
                       rowKey='userId' bordered
                       pagination={{
                           showTotal: (total: number) => `共 ${total} 条`,
                           position: ['bottomRight'],
                           showSizeChanger: true,
                           pageSizeOptions: ['5', '10', '20', '30', '50'],
                           defaultPageSize: 5
                       }}/>
                {/*{add_edit_visible&&<AddSystemUserModel add_edit_visible={add_edit_visible} onAddCancel={this.onAddCancel} onCreate={this.onCreate} userData={userData}/>}*/}
                <Modal
                    title="系统提醒"
                    visible={delete_visible}
                    onOk={this.onDelete}
                    onCancel={() => this.setState({delete_visible: false})}
                    okText="确认"
                    cancelText="取消">
                    <p>确认删除选择的消费记录？</p>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
    }
};
const mapDispatchToProps = (dispatch: any) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemUser);