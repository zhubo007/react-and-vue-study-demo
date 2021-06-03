import React, {Fragment} from 'react';
import {Button, Modal, Input, InputNumber, Form, Select, Row, Col} from 'antd';
import {BoxItemEntity, UserEntity} from "../../../entity/index"
import {connect} from "react-redux";
const {Option} = Select;

interface CollectionCreateFormProps {
    add_edit_visible: boolean;
    onCreate: (values: UserEntity) => void;
    onAddCancel: () => void;
    userData: UserEntity
    platformList: BoxItemEntity[]
}

//无状态组件
const AddSystemUserModel: React.FC<CollectionCreateFormProps> = ({add_edit_visible, onCreate, onAddCancel, userData,platformList}) => {
    const [form] = Form.useForm();

    return (
        <Fragment>
            <Modal visible={add_edit_visible} title="Title" getContainer={false} width={750} onCancel={onAddCancel}
                   footer={[<Button key="back" onClick={onAddCancel}>关闭</Button>,
                       <Button key="submit" type="primary" onClick={() => {
                           form.validateFields().then((values: UserEntity) => {
                               onCreate(values);
                               form.resetFields();
                           }).catch((info) => {
                               console.log('Validate Failed:', info);
                           });
                       }}>确定</Button>]}>
                <Form form={form} preserve={false} initialValues={{ ...userData,
                    buyerOrSeller:isNaN(userData.buyerOrSeller)?'':userData.buyerOrSeller,
                }}>
                    <Form.Item name="userId" className={'hideColumn'}>
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item name="lastLoginTime" className={'hideColumn'}>
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item name="isActive" className={'hideColumn'}>
                        <InputNumber disabled={true}/>
                    </Form.Item>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="enName" className="ant-form-item-required"
                                       title="简称">简称</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="enName" rules={[{required: true, message: '简称不能为空!' }]}>
                                <Input placeholder='请输入简称'/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="fullName" className="ant-form-item-required"
                                       title="全称">全称</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="fullName" rules={[{required: true, message: '全称不能为空!' }]}>
                                <Input placeholder='请输入全称'/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="buyerOrSeller" className="ant-form-item-required"
                                       title="用户类别">用户类别</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="buyerOrSeller" rules={[{required: true, message: '用户类别不能为空!', }]}>
                                <Select placeholder="请选择用户类别">
                                    <Option key={0} value={1}>买家</Option>
                                    <Option key={1} value={2}>卖家</Option>
                                    <Option key={2} value={3}>买家、卖家</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="platformId" className="ant-form-item-required" title="所在平台">所在平台</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="platformId" rules={[{required: true, message: '请选择所在平台!'}]}>
                                <Select placeholder="请选择所在平台">
                                    {
                                        platformList.map((item: BoxItemEntity, index: number) => <Option key={index} value={item.boxCode}>{item.boxText}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="age" className="ant-form-item-required" title="年龄">年龄</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="age" rules={[{required: true, message: '请填写年龄!'}]}>
                                <InputNumber placeholder='请填写年龄'/>
                            </Form.Item>
                        </Col>

                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="gender" className="ant-form-item-required"
                                       title="性别">性别</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="gender" rules={[{required: true, message: '请选择性别!'}]}>
                                <Select placeholder="请选择性别">
                                    <Option key={0} value={'M'}>男</Option>
                                    <Option key={1} value={'F'}>女</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal>
        </Fragment>
    )
};
export default connect(null, null)(AddSystemUserModel);