import React, {Fragment} from 'react';
import {Button, Modal, Input, InputNumber, Form, Row, Col, DatePicker, Select} from 'antd';
import {BoxItemObj , CashBookObj} from "../../../entity/index"
import {connect} from "react-redux";
import moment from 'moment'
const {Option} = Select;

const {TextArea} = Input;

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

interface CollectionCreateFormProps {
    add_edit_income_visible: boolean;
    onCreate: (values: CashBookObj) => void;
    onAddCancel: () => void;
    cashBook: CashBookObj,
    incomeTypeList: BoxItemObj[]
}

//无状态组件
const AddModal: React.FC<CollectionCreateFormProps> = ({add_edit_income_visible, onCreate, onAddCancel, cashBook,incomeTypeList}) => {
    const [form] = Form.useForm();

    return (
        <Fragment>
            <Modal visible={add_edit_income_visible} title="Title" getContainer={false} width={750} onCancel={onAddCancel}
                   footer={[<Button key="back" onClick={onAddCancel}>关闭</Button>,
                       <Button key="submit" type="primary" onClick={() => {
                           form.validateFields().then((values: CashBookObj) => {
                               onCreate(values);
                               form.resetFields();
                           }).catch((info) => {
                               console.log('Validate Failed:', info);
                           });
                       }}>确定</Button>]}>
                {/*当我们第一次点开Modal的时候， FormItem会得到一个initialValue,但是这个值只在组件挂载的时候执行了一次， 当我们再次打开Modal窗口的时候并不会更新。
                    https://www.jb51.net/article/198485.htm */}
                <Form form={form} preserve={false} initialValues={{...cashBook,incomeOrExpense:'income',postDate: moment(cashBook.postDate==''?new Date(): cashBook.postDate, dateFormat)}}>
                    <Form.Item name="incomeOrExpense" className={'hideColumn'}>
                        <Input disabled={true}/>
                    </Form.Item>

                    <Row gutter={24}>

                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="dealNo" className="ant-form-item-required" title="记账单号">记账单号</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="dealNo" >
                                <Input disabled={true} placeholder='记账单号'/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="postDate" className="ant-form-item-required" title="记账日期">记账日期</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="postDate" rules={[{required: true, message: '请填写记账日期!'}]}>
                                <DatePicker style={{width: '100%'}} format={dateFormat} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="ieCode" className="ant-form-item-required" title="收入类型">收入类型</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="ieCode" rules={[{required: true, message: '请选择收入类型!'}]}>
                                <Select placeholder="请选择收入类型">
                                    {
                                        incomeTypeList.map((item: BoxItemObj, index: number) => <Option key={index} value={item.boxCode}>{item.boxText}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="amt" title="收入金额">&nbsp;&nbsp;&nbsp;排序</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="amt">
                                <InputNumber placeholder='收入金额' style={{width: 218}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="remark" className="ant-form-item-required" title="描述">描述</label>
                            </div>
                        </Col>
                        <Col span={20}>
                            <Form.Item name="remark" rules={[{required: true, message: '请填写描述!'}]}>
                                <TextArea rows={4}/>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Modal>
        </Fragment>
    )
};
//
const initMapStateToProps = (state: any) => {
    return {}
};
const initMapDispatchToProps = (dispatch: any) => {
    return {}
};
export default connect(initMapStateToProps, initMapDispatchToProps)(AddModal);