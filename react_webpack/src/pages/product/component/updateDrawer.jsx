import React, { PureComponent,Fragment } from 'react';
import {connect } from 'react-redux';
import { Button,Input,Form,DatePicker,Select,Drawer} from 'antd';
import moment from "moment"
import {actionCreator} from "../store";
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';

class UpdateDrawer extends PureComponent{

    onClose = () => {
        this.props.hideUpdateDrawer();
    };
    handleSubmit = (e) => {
        const {currentPageNum,currentPageSize,handleUpdateUser} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                fieldsValue['birthDate']=fieldsValue['birthDate'].format('YYYY-MM-DD');
                handleUpdateUser(fieldsValue,currentPageNum,currentPageSize);
                this.props.form.resetFields();
                this.props.hideUpdateDrawer();
            }
        });
    }
    render(){
        console.log("update User,update User,update User");
        const { getFieldDecorator } = this.props.form;
        const { updateRecord } = this.props;
        const birthDate = moment(updateRecord['birthDate'],'YYYY-MM-DD');
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
       return (
           <Fragment>
               <Drawer
                   title="更新用户" width={520} onClose={this.onClose} visible={this.props.visible}
                   style={{overflow: 'auto', height: 'calc(100% - 108px)', paddingBottom: '108px',}}>
                   <Form {...formItemLayout}>
                       <Form.Item label='用户名' className='hideColumn'>
                           {getFieldDecorator('userId', {rules: [],initialValue:updateRecord['userId']})(
                               <Input/>
                           )}
                       </Form.Item>
                       <Form.Item label='用户名'>
                           {getFieldDecorator('username', {
                               rules: [{ required: true, message: '用户名不能为空!' },
                                   {validator: (rule, val, callback) => {
                                           if (!val) {
                                               callback();
                                           }
                                           let validateResult = /(^[a-zA-Z0-9_-]{5,16}$)|(^[\u2E80-\u9FFF]{2,5})/;  // 自定义规则
                                           if (!validateResult.test(val)) {
                                               callback('5-16为的数字与字母的组合，或2-5位的中文');
                                           }
                                           callback();
                                       }
                                   }],
                               initialValue:updateRecord['username']
                           })(
                               <Input placeholder='请输入用户名'/>
                           )}
                       </Form.Item>
                       <Form.Item label='出生日期'>
                           {getFieldDecorator('birthDate', {
                               rules: [{ required: true, message: '出生日期不能为空!' }],initialValue:birthDate
                           })(
                               <DatePicker style={{ width: '100%' }} format={dateFormat}/>
                           )}
                       </Form.Item>
                       <Form.Item label='性别'>
                           {getFieldDecorator('gender', {rules: [],initialValue:updateRecord['gender']})(
                               <Select>
                                   <Option value='F'>男</Option>
                                   <Option value='M'>女</Option>
                               </Select>
                           )}
                       </Form.Item>
                       <Form.Item label='用户备注'>
                           {getFieldDecorator('remark', {
                               rules: [{ required: true, message: '请填写备注!' }],initialValue:updateRecord['remark']
                           })(
                               <TextArea rows={4} />
                           )}
                       </Form.Item>
                   </Form>
                   <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9',
                           padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                       <Button onClick={this.onClose} style={{ marginRight: 8 }}>关闭</Button>
                       <Button onClick={this.handleSubmit} type="primary">更新</Button>
                   </div>
               </Drawer>
           </Fragment>
       )
    }
}
const mapState = (state) => {
    return {
        currentPageNum: state.getIn(['user_data','currentPageNum']),
        currentPageSize: state.getIn(['user_data','currentPageSize']),
    }
};
const mapDispatch = (dispatch) => {
    return {
        handleUpdateUser(fieldsValue,pageNumber,pageSize){
            dispatch(actionCreator.updateUser(fieldsValue,pageNumber,pageSize))
        }
    }
};
// const WrappedNormalLoginForm = Form.create({ name: 'update_user' })(UpdateDrawer);

export default connect(mapState, mapDispatch)(UpdateDrawer);