import React, {Fragment} from 'react';
import {Button, Modal, Input, InputNumber, Form, Row, Col} from 'antd';
import {BoxItemObj} from "../../../entity/index"
import {connect} from "react-redux";
const {TextArea} = Input;


interface CollectionCreateFormProps {
    add_edit_visible: boolean;
    onCreate: (values: BoxItemObj) => void;
    onAddCancel: () => void;
    boxItem: BoxItemObj
}

//无状态组件
const AddModal: React.FC<CollectionCreateFormProps> = ({add_edit_visible, onCreate, onAddCancel, boxItem}) => {
    const [form] = Form.useForm();

    return (
        <Fragment>
            <Modal visible={add_edit_visible} title="Title" getContainer={false} width={750} onCancel={onAddCancel}
                   footer={[<Button key="back" onClick={onAddCancel}>关闭</Button>,
                       <Button key="submit" type="primary" onClick={() => {
                           form.validateFields().then((values: BoxItemObj) => {
                               onCreate(values);
                               form.resetFields();
                           }).catch((info) => {
                               console.log('Validate Failed:', info);
                           });
                       }}>确定</Button>]}>
                {/*当我们第一次点开Modal的时候， FormItem会得到一个initialValue,但是这个值只在组件挂载的时候执行了一次， 当我们再次打开Modal窗口的时候并不会更新。
                    https://www.jb51.net/article/198485.htm */}
                <Form form={form} preserve={false} initialValues={{...boxItem}}>
                    <Form.Item name="boxId" className={'hideColumn'}>
                        <InputNumber disabled={true}/>
                    </Form.Item>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="boxCodeP" className="ant-form-item-required" title="大类别">大类别</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="boxCodeP" rules={[{required: true, message: '请填写大类别!'}]}>
                                <Input placeholder='大类别'/>
                            </Form.Item>
                        </Col>

                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="boxCode" className="ant-form-item-required" title="字典项代码">字典项代码</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="boxCode" rules={[{required: true, message: '请填写字典项代码!'}]}>
                                <Input placeholder='请填写字典项代码'/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="boxText" title="字典项名称">&nbsp;&nbsp;&nbsp;字典项名称</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="boxText" rules={[{required: true, message: '请填写字典项名称!'}]}>
                                <Input placeholder='请填写字典项名称'/>
                            </Form.Item>
                        </Col>

                        <Col span={4}>
                            <div className="ant-col ant-form-item-label">
                                <label htmlFor="sort" title="排序">&nbsp;&nbsp;&nbsp;排序</label>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="sort">
                                <InputNumber placeholder='排序' style={{width: 218}}/>
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