import {Layout, Menu, Breadcrumb, Tabs} from 'antd';
import React from "react";
import {connect} from "react-redux";
import {constants} from "./store/index";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const TabPane = Tabs.TabPane;

interface MainAppProps {
}

interface MainAppState {
    collapsed: boolean;
    panes: any[];
    selectedKeys: string[];
    tabKeys: string[];
    activeKey: string;
    titleMenuActiveKey: string;
    openKeys: string[];
}

class MainApp extends React.Component<MainAppProps, MainAppState>{

    constructor(props: MainAppProps) {
        super(props);
        this.state = {
            collapsed: false,//展开缩放的标记
            panes:[],//tab标签的属性集合
            selectedKeys:[],//菜单树激活的key，必须是array类型的
            tabKeys:[],//所有的tab标签的key值
            activeKey:'',//Tab标签激活的ID
            titleMenuActiveKey:'',
            openKeys:[],//展开的父级目录的ID
        };
        this.titleMenuClick = this.titleMenuClick.bind(this);
        this.getComponent = this.getComponent.bind(this);
    }

    componentWillMount(){
        this.titleMenuClick({key:'Product'})
    }

    titleMenuClick = (event: any)=>{
        this.setState({titleMenuActiveKey: event.key})
    };

    getComponent = (titleMenuActiveKey: string) => {
        const Component = (constants.componentMap)[titleMenuActiveKey];
        if (Component){
            return <Component key={titleMenuActiveKey}/>
        } {
            return null;
        }
    };

    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Product']}>
                        <Menu.Item key="Product" onClick={this.titleMenuClick}>商品列表</Menu.Item>
                        <Menu.Item key="Account" onClick={this.titleMenuClick}>消费记录</Menu.Item>
                        <Menu.Item key="Market" onClick={this.titleMenuClick}>收入理财</Menu.Item>
                        <Menu.Item key="SystemUser" onClick={this.titleMenuClick}>后台系统</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {this.getComponent(this.state.titleMenuActiveKey)}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
const initMapStateToProps = (state: any) => {
    return {
    }
};
const initMapDispatchToProps = (dispatch: any) => {
    return {
    }
};
export default connect(initMapStateToProps, initMapDispatchToProps)(MainApp);