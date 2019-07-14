import React, { PureComponent,Fragment } from 'react';
import {connect } from 'react-redux';
import { Button,Modal,Input,Form,DatePicker,Select} from 'antd';
import {actionCreator} from "../store";
// import locale from 'antd/lib/date-picker/locale/zh_CN';
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';

class AddModal extends PureComponent{
    constructor(props){
        super(props);
    }

    handleSubmit = (e) => {
        const {currentPageNum,currentPageSize,handleAddUser} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                fieldsValue['birthDate']=fieldsValue['birthDate'].format('YYYY-MM-DD');
                handleAddUser(fieldsValue,currentPageNum,currentPageSize);
                this.props.form.resetFields();
                this.props.hideAddModal();
            }
        });
    };
    closeModal = () => {
        this.props.form.resetFields();
        this.props.hideAddModal();
    };
    render(){
        console.log("add User,add User,add User");
        const { getFieldDecorator } = this.props.form;
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
                <Modal visible={this.props.visible} title="Title" onOk={this.handleSubmit} onCancel={this.closeModal}
                       footer={[<Button key="back" onClick={this.closeModal}>关闭</Button>,
                           <Button key="submit" type="primary" onClick={this.handleSubmit}>确定</Button>,]}>
                    <Form {...formItemLayout}>
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
                            })(
                                <Input placeholder='请输入用户名'/>
                            )}
                        </Form.Item>
                        <Form.Item label='出生日期'>
                            {getFieldDecorator('birthDate', {
                                rules: [{ required: true, message: '出生日期不能为空!' }],
                            })(
                            <DatePicker style={{ width: '100%' }} format={dateFormat}/>
                            )}
                        </Form.Item>
                        <Form.Item label='性别'>
                            {getFieldDecorator('gender', {rules: [],})(
                            <Select>
                                <Option value='F'>男</Option>
                                <Option value='M'>女</Option>
                            </Select>
                            )}
                        </Form.Item>
                        <Form.Item label='用户备注'>
                            {getFieldDecorator('remark', {
                                rules: [{ required: true, message: '请填写备注!' }],
                            })(
                            <TextArea rows={4} />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
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
        handleAddUser(values,pageNumber,pageSize){
            dispatch(actionCreator.addUser(values,pageNumber,pageSize))
        }
    }
};
const WrappedNormalLoginForm = Form.create({ name: 'add_user' })(AddModal);

export default connect(mapState, mapDispatch)(WrappedNormalLoginForm);