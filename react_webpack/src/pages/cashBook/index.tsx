import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Table, Select, Input, Button, message, Modal, Form} from 'antd'
import {AddExpenseModel, AddIncomeModel} from './component/index'
import {actionCreator} from "../../utils/store/index";
import '../../main.css'
import moment from 'moment'
import {BoxItemObj, CashBookObj, ProductObj} from "../../entity/index"

const Option = Select.Option;

const columns = [
    {
        title: '记账单号',
        dataIndex: 'dealNo',
        key: 'dealNo',
    },
    {
        title: '记账日期',
        dataIndex: 'postDate',
        key: 'postDate',
        render: (value: string, rowData: CashBookObj, index: number) => {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        },
    },
    {
        title: '支出/收入类型',
        dataIndex: 'ieCodeName',
        key: 'ieCodeName'
    },
    {
        title: '支出/收入 代码',
        dataIndex: 'ieCode',
        key: 'ieCode',
        className: 'hideColumn'
    },
    {
        title: '支出/收入',
        dataIndex: 'incomeOrExpenseName',
        key: 'incomeOrExpense',
        render: (value: string, rowData: CashBookObj, index: number) => {
            if("expense" == rowData.incomeOrExpense){
                return "支出"
            }else if("income" == rowData.incomeOrExpense){
                return "收入"
            }
        }
    },
    {
        title: '金额',
        dataIndex: 'amt',
        key: 'amt'
    },
    {
        title: '描述',
        dataIndex: 'remark',
        key: 'remark'
    }
];

const ieSelectData = [{value:'expense',text:'支出'}, {value:'income', text:'收入'}];

//不使用immutable brandList类型为BrandObj[]，使用immutable后brandList类型为List<BrandObj>
interface CashBookProps {
    handleGetExpensesTypeList: (expensesTypeList: BoxItemObj[]) => void;
    handleGetIncomeTypeList: (incomeTypeList: BoxItemObj[]) => void;
    expensesTypeList: BoxItemObj[];
    incomeTypeList: BoxItemObj[];
}

interface CashBookState {
    ieCode: string
    ieTypeList:BoxItemObj[]
    incomeOrExpense: string
    cashBookList: CashBookObj[]
    add_edit_expense_visible: boolean
    add_edit_income_visible: boolean
    delete_visible: boolean
    selectedRowKeys: string[]
    dealNo: string
    cashBook: CashBookObj
}

export const newCashBook: CashBookObj = {dealNo: '', postDate:'', ieCode: '', incomeOrExpense: '', amt: NaN, remark: ''};

class CashBook extends React.Component<CashBookProps, CashBookState> {

    constructor(props: CashBookProps) {
        super(props);
        this.state = {
            ieCode:'',
            ieTypeList:[],
            incomeOrExpense: 'expense',
            cashBookList: [],
            add_edit_expense_visible: false,
            add_edit_income_visible: false,
            delete_visible: false,
            selectedRowKeys: [],
            dealNo: '',
            cashBook: newCashBook
        };
        this.onAddCancel = this.onAddCancel.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onClickRow = this.onClickRow.bind(this);
    }

    componentDidMount() {
        this.props.handleGetExpensesTypeList(this.props.expensesTypeList);
        this.props.handleGetIncomeTypeList(this.props.incomeTypeList);
        this.request();
    }

    onSelectChange = (selectedRowKeys: string[]) => {
        this.setState({selectedRowKeys});
    };

    request = () => {
        axios.get('/app/cashBook/all', {
            params: {
                ieCode: this.state.ieCode,
                incomeOrExpense: this.state.incomeOrExpense
            }
        }).then((response: any) => {
            this.setState({cashBookList: response.data})
            if (this.state.ieTypeList.length == 0){
                this.setState({ieTypeList: this.props.expensesTypeList})
            }

        }).catch((error) => {
            console.log(error)
        })
    };
    onCreate = (values: CashBookObj) => {
        let requestUrl = `/app/cashBook/add`;
        if (values.dealNo != null && values.dealNo != undefined && '' != values.dealNo ){
            requestUrl = `/app/cashBook/update/${values.dealNo}`;
        }
        axios.post(requestUrl, {...values})
            .then(res => {
                if(values.incomeOrExpense == 'expense'){
                    this.setState({add_edit_expense_visible: false});
                }else if(values.incomeOrExpense == 'income'){
                    this.setState({add_edit_income_visible: false});
                }
                message.success('操作成功');
                this.request();
            }).catch((error) => {
            message.error('操作失败');
        })
    };
    onDelete = () => {
        const keys = this.state.selectedRowKeys;
        if (keys.length == 0 ){
            alert("请选择消费记录");
            return;
        }
        keys.forEach((value: string, index: number) => {
            axios.post(`/app/cashBook/delete/${value}`,{})
                .then(res => {
                    this.request();
                }).catch((error) => {
                message.error("删除异常");
            })
        });
        message.success('类别删除成功');
        this.setState({delete_visible: false})
    };
    onAddCancel = () => {
        this.setState({add_edit_expense_visible: false,add_edit_income_visible: false});
    };
    onClickRow = (record: CashBookObj) => {
        return {
            onClick: () => {
                alert("双击行")
            },
            onDoubleClick: (event: any) => {
                console.log(event)
            }
        };
    };
    render() {
        const {selectedRowKeys, delete_visible, add_edit_expense_visible, add_edit_income_visible, cashBookList, ieTypeList, cashBook} = this.state;

        const {expensesTypeList, incomeTypeList} = this.props;

        const rowSelection: Object = {
            selectedRowKeys,
            type: 'checkbox',
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                {
                    key: 'NONE SELECTED',
                    text: '全不选中',
                    onSelect: (changeableRowKeys: string[]) => {
                        this.setState({selectedRowKeys: []});
                    },
                },
            ]
        };
        return (
            <Fragment>
                <Button type="primary" onClick={() => this.setState({add_edit_expense_visible: true, cashBook: newCashBook })} style={{marginRight: '8px'}}>新增支出</Button>
                <Button type="primary" onClick={() => this.setState({add_edit_income_visible: true, cashBook: newCashBook })} style={{marginRight: '8px'}}>新增收入</Button>
                <Button type="ghost" onClick={() => {
                    if (selectedRowKeys.length == 0){
                        message.warn("请选择一条数据进行编辑");
                    }else if(selectedRowKeys.length > 1){
                        message.warn("一次只能对一条数据进行编辑");
                    }else {
                        const dealNo = selectedRowKeys[0];
                        cashBookList.forEach((value: CashBookObj, index: number, array: CashBookObj[]) => {
                            if (value.dealNo == dealNo) {
                                if(value.incomeOrExpense == 'expense'){
                                    this.setState({add_edit_expense_visible: true, cashBook: value});
                                }else if(value.incomeOrExpense == 'income'){
                                    this.setState({add_edit_income_visible: true, cashBook: value});
                                }
                                return
                            }
                        })
                    }
                }} style={{marginRight: '8px'}}>编辑收支记录</Button>

                <Button type="primary" danger onClick={() => {
                    if (selectedRowKeys.length == 0){
                        message.warn("请选择一条数据进行删除");
                    }else {
                        this.setState({delete_visible: true})
                    }
                }} style={{marginRight: '8px'}}>删除收支记录</Button>
                <Select placeholder="请选择支出类型" value={this.state.incomeOrExpense} onChange={(option: any) => {
                    if(option == 'income'){
                        this.setState({ieTypeList: incomeTypeList,ieCode:'',incomeOrExpense: option})
                    }else if(option == 'expense'){
                        this.setState({ieTypeList: expensesTypeList,ieCode:'',incomeOrExpense: option})
                    }else{
                        this.setState({ieTypeList: [...expensesTypeList,...incomeTypeList],ieCode:'',incomeOrExpense: option})
                    }
                }} style={{width: 240}}>

                    {
                        ieSelectData.map((selectData: any,index:number) => {
                            return <Option key={index} value={selectData.value}>{selectData.text}</Option>
                        })
                    }
                </Select>

                <Select placeholder="请选择支出类型" value={this.state.ieCode} onChange={(option: any) => {this.setState({ieCode: option})}} style={{width: 240}}>
                    {
                        ieTypeList.map((item: BoxItemObj, index: number) => <Option key={index} value={item.boxCode}>{item.boxText}</Option>)
                    }
                </Select>
                <Button type="ghost" onClick={() => {
                    this.setState({ieCode:'',incomeOrExpense:'',ieTypeList:[]})
                }} style={{marginRight: '8px'}}>清除</Button>
                <Button type="primary" onClick={() => this.request()}>搜索</Button>
                <Table columns={columns} dataSource={cashBookList} rowSelection={rowSelection}
                       rowKey='dealNo' bordered
                       pagination={{
                           showTotal: (total: number) => `共 ${total} 条`,
                           position: ['bottomRight'],
                           showSizeChanger: true,
                           pageSizeOptions: ['5', '10', '20', '30', '50'],
                           defaultPageSize: 5
                       }}/>
                {add_edit_expense_visible&&<AddExpenseModel add_edit_expense_visible={add_edit_expense_visible} onAddCancel={this.onAddCancel} onCreate={this.onCreate} cashBook={cashBook} expensesTypeList={expensesTypeList}/>}
                {add_edit_income_visible&&<AddIncomeModel add_edit_income_visible={add_edit_income_visible} onAddCancel={this.onAddCancel} onCreate={this.onCreate} cashBook={cashBook} incomeTypeList={incomeTypeList}/>}
                <Modal
                    title="系统提醒"
                    visible={delete_visible}
                    onOk={this.onDelete}
                    onCancel={() => this.setState({delete_visible: false})}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>确认删除选择的该类别？</p>
                </Modal>
            </Fragment>
        )
    }
}
//1. initMapStateToProps  initMapDispatchToProps也可以用在无状态组件当中
//2. initMapStateToProps不使用immutable获取值的方式为 return {brandList: state.common_reducer.brandList}
const initMapStateToProps = (state: any) => {
    return {
        expensesTypeList: state.getIn(['common_reducer','expensesTypeList']).toJS(),
        incomeTypeList: state.getIn(['common_reducer','incomeTypeList']).toJS()
    }
};
const initMapDispatchToProps = (dispatch: any) => {
    return {
        handleGetExpensesTypeList(expensesTypeList: BoxItemObj[]) {
            // 简单的值，不需要发请求的值可以通过简单的dispatch(action)方式更改store中的值
            // const action = {type: "add_product", value: ""};
            // dispatch(action)
            if (expensesTypeList.length==0){
                dispatch(actionCreator.getBoxItemList(null, 'expensesType'))
            }
        },
        handleGetIncomeTypeList(incomeTypeList: BoxItemObj[]){
            dispatch(actionCreator.getBoxItemList(null, 'incomeType'))
        }
    }
};
export default connect(initMapStateToProps, initMapDispatchToProps)(CashBook);
