import React, {Fragment, useEffect, useState} from 'react';
import {Button, Modal, Input, InputNumber, Form, DatePicker, Select, Row, Col} from 'antd';
import {BrandObj, ProductObj} from "../../../entity/index"
import {connect} from "react-redux";
import moment from 'moment'
const {Option} = Select;
const {TextArea} = Input;

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

interface CollectionCreateFormProps {
    add_edit_visible: boolean;
    onCreate: (values: ProductObj) => void;
    onAddCancel: () => void;
    brandList: BrandObj[],
    product: ProductObj
}

//无状态组件
const AddModal: React.FC<CollectionCreateFormProps> = ({add_edit_visible, onCreate, onAddCancel, brandList, product}) => {
    const [form] = Form.useForm();
    // form.resetFields();
    //const [param, setParam] = useState(newProduct);
    //setParam({...product})
    // useEffect( () =>{
    //
    // },[]);

    return (
        <Fragment>
            <Modal visible={add_edit_visible} title="Title" getContainer={false} width={750} onCancel={onAddCancel}
                   footer={[<Button key="back" onClick={onAddCancel}>关闭</Button>,
                       <Button key="submit" type="primary" onClick={() => {
                           form.validateFields().then((values: ProductObj) => {
                               onCreate(values);
                               form.resetFields();
                           }).catch((info) => {
                               console.log('Validate Failed:', info);
                           });
                       }}>确定</Button>]}>
                {/*当我们第一次点开Modal的时候， FormItem会得到一个initialValue,但是这个值只在组件挂载的时候执行了一次， 当我们再次打开Modal窗口的时候并不会更新。
                    https://www.jb51.net/article/198485.htm */}
                <Form form={form} preserve={false} initialValues={{ ...product,followTime: moment(product.followTime==''?new Date(): product.followTime, dateFormat)}}>
                    <Form.Item name="productId" className={'hideColumn'}>
                        <InputNumber disabled={true}/>
                    </Form.Item>
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
                                <label htmlFor="followTime" className="ant-form-item-required"
                                       title="首次跟踪时间">首次跟踪时间</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="followTime" rules={[{required: true, message: '首次跟踪时间不能为空!', }]}>
                                <DatePicker style={{width: '100%'}} format={dateFormat} />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="brandType" className="ant-form-item-required" title="商品品牌">商品品牌</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="brandType" rules={[{required: true, message: '请选择商品品牌!'}]}>
                                <Select placeholder="请选择品牌">
                                    {
                                        brandList.map((item: BrandObj, index: number) => <Option key={index} value={item.boxCode}>{item.boxText}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="startPrice" className="ant-form-item-required" title="关注价格">关注价格</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="startPrice" rules={[{required: true, message: '请填写关注价格!'}]}>
                                <InputNumber placeholder='请填写关注价格' style={{width: 218}}/>
                            </Form.Item>
                        </Col>

                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="expectPrice" className="ant-form-item-required"
                                       title="预期价格">预期价格</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="expectPrice" rules={[{required: true, message: '请填写预期价格!'}]}>
                                <InputNumber placeholder='请填写预期价格' style={{width: 218}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="fiveLevel" title="商品级别">&nbsp;&nbsp;&nbsp;商品级别</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="fiveLevel" rules={[{required: true, message: '请填写商品级别!'}]}>
                                <InputNumber placeholder='请填写商品级别'/>
                            </Form.Item>
                        </Col>

                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="reference" title="推荐人">&nbsp;&nbsp;&nbsp;推荐人</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="reference">
                                <Input placeholder='推荐人'/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="productDie" className="ant-form-item-required" title="商品描述">商品描述</label>
                            </div>
                        </Col>
                        <Col span={20}>
                            <Form.Item name="productDie" rules={[{required: true, message: '请填写商品描述!'}]}>
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
    return {}
};
const initMapDispatchToProps = (dispatch: any) => {
    return {}
};
export default connect(initMapStateToProps, initMapDispatchToProps)(AddModal);