import React, {PureComponent, Fragment} from 'react';
import {connect} from 'react-redux';
import {Table, Divider, Button,Modal} from 'antd';
import {actionCreator} from './store';
import {AddModal,UpdateDrawer} from './component';
import '../../main.css'
const {Column} = Table;
const confirm = Modal.confirm;

class MacroMonitor extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            update_visible:false,
            add_visible:false,
            updateRecord:{}
        };
        this.showDrawer = this.showDrawer.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.hideAddModal = this.hideAddModal.bind(this);
        this.hideUpdateDrawer = this.hideUpdateDrawer.bind(this);
        this.handleDelUser = this.handleDelUser.bind(this);
    }
    componentDidMount(){
        this.props.getUserData(1,5);
    }
    showDrawer(record){
        this.setState({update_visible:true,updateRecord:record})
    }
    handleDelUser(record){
        const {handleDelUser} = this.props;
        confirm({
            title: '确认删除'+record['username']+"?",
            content: '提示：删除不可撤回',
            onOk() {
                handleDelUser(record['userId'])
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    showAddModal(){
        this.setState({add_visible:true})
    }
    hideAddModal(){
        this.setState({add_visible:false})
    }
    hideUpdateDrawer(){
        this.setState({update_visible:false})
    }
    render() {
        const {tableData,selectedRowKeys,onSelectChange,getUserData,pages,total} = this.props;
        const {add_visible,update_visible,updateRecord} = this.state;
        const rowSelection = {
            selectedRowKeys:selectedRowKeys.toJS(), onChange: onSelectChange,
        };
        return (
            <Fragment>
                <Button type="primary" onClick={this.showAddModal}>新增用户</Button>
                <Table dataSource={tableData.toJS()} rowSelection={rowSelection} rowKey='userId'
                       pagination={{ position: 'bottom',showSizeChanger:true,pageSizeOptions:['5','10','20','30','50'],total:total,defaultPageSize:5,
                           showTotal:total => `共 ${total} 条`,
                           onChange:(pageNumber, pageSize) => {getUserData(pageNumber,pageSize)},
                           onShowSizeChange:(currentPageNum, size) => {getUserData(currentPageNum,size)} }}>
                    <Column title="用户ID" dataIndex="userId" key="userId" className='hideColumn'/>
                    <Column title="用户名" dataIndex="username" key="username"/>
                    <Column title="用户密码" dataIndex="password" key="password" className='hideColumn'/>
                    <Column title="出生日期" dataIndex="birthDate" key="birthDate"/>
                    <Column title="注册时间" dataIndex="registerDate" key="registerDate" className='hideColumn'/>
                    <Column title="性别" dataIndex="gender" key="gender" render={(text) => (text==="F"?"男":"女")}/>
                    <Column title="备注" dataIndex="remark" key="remark"/>
                    <Column
                        title="操作"
                        key="action"
                        render={(text,record,index) => (
                            <span>
                                <Button onClick={() => this.showDrawer(record)}>编辑</Button>
                                <Divider type="vertical"/>
                                <Button onClick={() => this.handleDelUser(record)}>删除</Button>
                            </span>
                        )}
                    />
                </Table>
                <AddModal visible={add_visible} hideAddModal={this.hideAddModal}/>
                <UpdateDrawer visible={update_visible} updateRecord={updateRecord} hideUpdateDrawer={this.hideUpdateDrawer} />
            </Fragment>
        )
    }
}

const mapState = (state) => {
    return {
        tableData: state.getIn(['user_data','tableData']),
        selectedRowKeys: state.getIn(['user_data','selectedRowKeys']),
        pages:state.getIn(['user_data','pages']),
        total:state.getIn(['user_data','total']),
    }
};
const mapDispatch = (dispatch) => {
    return {
        getUserData(pageNumber,pageSize){
            dispatch(actionCreator.getUserData(pageNumber,pageSize))
        },
        onSelectChange(selectedRowKeys){
            dispatch(actionCreator.selectChange(selectedRowKeys))
        },
        handleDelUser(userId){
            dispatch(actionCreator.handleDelUser(userId))
        }
    }
};
export default connect(mapState, mapDispatch)(MacroMonitor);
