import React, { PureComponent,Fragment } from 'react';
import {connect } from 'react-redux';
import { Button,Modal,Input,Form,DatePicker,Select} from 'antd';
import {actionCreator} from "../store";
// import locale from 'antd/lib/date-picker/locale/zh_CN';
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';


const AddModal = ({ visible, onCreate, onAddCancel }) => {
    const [form] = Form.useForm();

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
            <Modal visible={visible} title="Title" onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }} onCancel={onAddCancel}
                    footer={[<Button key="back" onClick={onAddCancel}>关闭</Button>,
                            <Button key="submit" type="primary" onClick={() => {
                                form.validateFields().then((values) => {
                                    form.resetFields();
                                    onCreate(values);
                                }).catch((info) => {
                                    console.log('Validate Failed:', info);
                                });
                            }}>确定</Button>]}>

                <Form {...formItemLayout} form={form} layout="vertical" initialValues={{'gender': 'M',}}>
                    <Form.Item label='用户名' name="username" rules={[
                                { required: true, message: '用户名不能为空!' },
                                {
                                    validator: (_, value) =>{
                                        if (!value) {
                                            return Promise.resolve();
                                        }
                                        let validateResult = /(^[a-zA-Z0-9_-]{5,16}$)|(^[\u4E00-\u9FA5]{2,5}$)/;  // 自定义规则
                                        console.log(validateResult.test(value))
                                        if (!validateResult.test(value)) {
                                            return Promise.reject(new Error('5-16为的数字与字母的组合，或2-5位的中文'));
                                        }
                                        return Promise.resolve();
                                    }
                                },
                                ]}>
                        <Input placeholder='请输入用户名'/>
                    </Form.Item>
                    <Form.Item label='出生日期' name="birthDate" rules={[{ required: true, message: '出生日期不能为空!' }]}>
                        <DatePicker style={{ width: '100%' }} format={dateFormat}/>
                    </Form.Item>
                    <Form.Item label='性别' name="gender" rules={[]}>
                        <Select>
                            <Option value='F'>男</Option>
                            <Option value='M'>女</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='用户备注' name="remark" rules={[{required: true, message: '请填写备注!'}]}>
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
                
            </Modal>
        </Fragment>
    )
}

export default AddModal;