import React, {Fragment} from 'react';
import {Button, Modal, Input, InputNumber, Form, DatePicker, Select, Row, Col} from 'antd';
import {BoxItemEntity, BrandObj, TradeCommonEntity} from "../../../entity/index"
import {connect} from "react-redux";

const {Option} = Select;
const {TextArea} = Input;

const dateFormat = 'YYYY-MM-DD';

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: TradeCommonEntity) => void;
    onAddCancel: () => void;
    platformList: BoxItemEntity[],
    payWayList: BoxItemEntity[],
}

//无状态组件
const AddAccountModal: React.FC<CollectionCreateFormProps> = ({visible, onCreate, onAddCancel,platformList, payWayList}) => {
    const [form] = Form.useForm();
    //const {platformList} = this.props;
    console.log(platformList)
    return (
        <Fragment>
            <Modal visible={visible} title="Title" width={750} onOk={() => {
                form.validateFields().then((values: TradeCommonEntity) => {
                    onCreate(values);
                    form.resetFields();
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }} onCancel={onAddCancel} footer={[<Button key="back" onClick={onAddCancel}>关闭</Button>,
                       <Button key="submit" type="primary" onClick={() => {
                           form.validateFields().then((values: TradeCommonEntity) => {
                               onCreate(values);
                               form.resetFields();
                           }).catch((info) => {
                               console.log('Validate Failed:', info);
                           });
                       }}>确定</Button>]}>

                <Form form={form} initialValues={{'gender': 'M',}}>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="productName" className="ant-form-item-required"
                                       title="首次跟踪时间">商品名称</label>
                            </div>
                        </Col>
                        <Col span={15}>
                            <Form.Item name="productName" rules={[
                                {required: true, message: '商品名称不能为空!'},
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.resolve();
                                        }
                                        let validateResult = /(^[a-zA-Z0-9_-]{2,100}$)|(^[\u4E00-\u9FA5a-zA-Z0-9]{2,20}$)/;  // 自定义规则
                                        if (!validateResult.test(value)) {
                                            return Promise.reject(new Error('2-100为的数字与字母的组合，或2-20位的中文'));
                                        }
                                        return Promise.resolve();
                                    }
                                },
                            ]}>
                                <Input placeholder='请输入商品名称'/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="recordTime" className="ant-form-item-required"
                                       title="购买时间">购买时间</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="recordTime" rules={[{required: true, message: '购买时间不能为空!'}]}>
                                <DatePicker style={{width: '100%'}} format={dateFormat}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="payWay" className="ant-form-item-required" title="支付方式">支付方式</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="payWay" rules={[{required: true, message: '请选择支付方式!'}]}>
                                <Select placeholder="请选择支付方式">
                                    {
                                        payWayList.map((item: BoxItemEntity, index: number) => <Option key={index} value={item.boxCode}>{item.boxText}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="platformId" className="ant-form-item-required" title="购买平台">购买平台</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="platformId" rules={[{required: true, message: '请选择购买平台!'}]}>
                                <Select placeholder="请选择购买平台">
                                    {
                                        platformList.map((item: BoxItemEntity, index: number) => <Option key={index} value={item.boxCode}>{item.boxText}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="productNum" className="ant-form-item-required"
                                       title="商品数量">商品数量</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="productNum" rules={[{required: true, message: '请填写商品数量!'}]}>
                                <InputNumber placeholder='请填写商品数量' style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="productPrice" className="ant-form-item-required" title="商品单价">&nbsp;&nbsp;&nbsp;商品单价</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="productPrice" rules={[{required: true, message: '请填写商品单价!'}]}>
                                <InputNumber placeholder='请填写商品单价' style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>

                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="totalPrice" className="ant-form-item-required" title="实付款">&nbsp;&nbsp;&nbsp;实付款</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="totalPrice">
                                <InputNumber placeholder='请填写实付款' style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="discountDie" className="ant-form-item-required" title="优惠描述">优惠描述</label>
                            </div>
                        </Col>
                        <Col span={20}>
                            <Form.Item name="discountDie" rules={[{required: true, message: '请填写优惠详情!'}]}>
                                <TextArea rows={4}/>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>

            </Modal>
        </Fragment>
    )
}
//
const initMapStateToProps = (state: any) => {
    return {
        platformList: state.getIn(['common_reducer','platformList']).toJS(),
        payWayList: state.getIn(['common_reducer','payWayList']).toJS()
    }
};
const initMapDispatchToProps = (dispatch: any) => {
    return {

    }
};
export default connect(initMapStateToProps, initMapDispatchToProps)(AddAccountModal);