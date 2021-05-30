import React, {Fragment, useState, useEffect} from 'react';
import {Button, Modal, Input, InputNumber, Form, DatePicker, Select, Row, Col, Table} from 'antd';
import {BoxItemEntity, ProductObj, TradeCommonEntity, UserEntity} from "../../../entity/index"
import {connect} from "react-redux";
import {TradeCommonProps} from "../index";
import moment from 'moment'

const {Option} = Select;
const {TextArea} = Input;

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

interface CollectionCreateFormProps {
    visible: boolean
    onCreate: (values: TradeCommonEntity) => void
    onAddCancel: () => void
    tradeCommon: TradeCommonEntity
    //handleGetUserList: () => void
    props: TradeCommonProps
}

//无状态组件
const AddAccountModal: React.FC<CollectionCreateFormProps> = ({visible, onCreate, onAddCancel, tradeCommon,props}) => {
    const [form] = Form.useForm();
    form.setFieldsValue({ ...tradeCommon,recordTime: moment(tradeCommon.recordTime==''?new Date(): tradeCommon.recordTime, dateFormat)});
    useEffect( () =>{
       props.handleGetUserList();
    },[]);
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

                <Form form={form}>
                    <Form.Item name="dealNo" className={'hideColumn'}>
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item name="brandId" className={'hideColumn'}>
                        <Input disabled={true}/>
                    </Form.Item>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="productId" className="ant-form-item-required"
                                       title="商品名称">商品名称</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="productId" rules={[{required: true, message: '商品名称不能为空!'},]}>
                                <Select placeholder="请选择商品名称" onChange={(value, option) =>{
                                    const productOption = JSON.parse(JSON.stringify(option));
                                    form.setFieldsValue({
                                        brandName: productOption.item['brandName'],
                                        brandId: productOption.item['brandId'],
                                    })
                                }}>
                                    {
                                        props.productList.map((item: ProductObj, index: number) => <Option key={index} value={item.productId} item={item}>{item.productName}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="brandName" className="ant-form-item-required"
                                       title="品牌">&nbsp;&nbsp;&nbsp;品牌</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="brandName" rules={[{required: true, message: '请填写品牌!'}]}>
                                <Input placeholder='请填写品牌' style={{width: '100%'}} disabled={true}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="buyer" className="ant-form-item-required" title="买家">买家</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="buyer" rules={[{required: true, message: '请选择买家!'}]}>
                                <Select placeholder="请选择买家">
                                    {
                                        props.userList.map((item: UserEntity, index: number) => <Option key={index} value={item.userId}>{item.realName}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="seller" className="ant-form-item-required" title="卖家">卖家</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="seller" rules={[{required: true, message: '请选择卖家!'}]}>
                                <Select placeholder="请选择卖家">
                                    {
                                        props.userList.map((item: UserEntity, index: number) => <Option key={index} value={item.userId}>{item.realName}</Option>)
                                    }
                                </Select>
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
                                        props.payWayList.map((item: BoxItemEntity, index: number) => <Option key={index}
                                                                                                       value={item.boxCode}>{item.boxText}</Option>)
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
                                        props.platformList.map((item: BoxItemEntity, index: number) => <Option key={index}
                                                                                                         value={item.boxCode}>{item.boxText}</Option>)
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
                                <label htmlFor="productPrice" className="ant-form-item-required"
                                       title="商品单价">&nbsp;&nbsp;&nbsp;商品单价</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="productPrice" rules={[{required: true, message: '请填写商品单价!'}]}>
                                <InputNumber placeholder='请填写商品单价' style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>

                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="totalPrice" className="ant-form-item-required"
                                       title="实付款">&nbsp;&nbsp;&nbsp;实付款</label>
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
                                <label htmlFor="discountDie" className="ant-form-item-required"
                                       title="优惠描述">优惠描述</label>
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
    }
};
const initMapDispatchToProps = (dispatch: any) => {
    return {
    }
};
export default connect(initMapStateToProps, initMapDispatchToProps)(AddAccountModal);