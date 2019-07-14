import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Icon, Layout, Button,Tabs,Menu} from 'antd';
import {constants} from "./store";
const {Header, Sider, Content} = Layout;

const TabPane = Tabs.TabPane;
class Index extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,//展开缩放的标记
            panes:[],//tab标签的属性集合
            selectedKeys:[],//菜单树激活的key，必须是array类型的
            tabKeys:[],//所有的tab标签的key值
            activeKey:'',//Tab标签激活的ID
            openKeys:[],//展开的父级目录的ID
        };
    }
    componentDidMount() {
        const pathname = this.props.location.pathname;
        // 防止页面刷新侧边栏又初始化了
        //获取当前所在的目录层级
        const rank = pathname.split('/');
        switch (rank.length) {
            case 2 :  //一级目录
                this.setState({selectedKeys:[pathname]});
                break;
            case 5 : //三级目录，要展开两个subMenu
                this.setState({selectedKeys:[pathname],openKeys:[rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')]});
                break;
            default :
                this.setState({selectedKeys:[pathname],openKeys:[pathname.substr(0, pathname.lastIndexOf('/'))]});
        }
    }
    componentWillReceiveProps(nextProps) {
        // 当点击面包屑导航时，侧边栏要同步响应
        const pathname = nextProps.location.pathname;
        if (this.props.location.pathname !== pathname) {
            this.setState({selectedKeys:[pathname]});
        }
    }
    renderMenuItem = ({key, icon, title}) => {
        const { tabKeys,panes } = this.state;
        return (
            <Menu.Item key={key} title={title} onClick={(paraMap) => this.handleMenuClick({...paraMap,title,tabKeys:tabKeys,panes:panes})}>
                {icon && <Icon type={icon}/>}
                <span>{title}</span>
            </Menu.Item>
        )
    };
    renderSubMenu = ({key, icon, title, subs}) => {
        return (
            <Menu.SubMenu key={key} title={<span>{icon && <Icon type={icon}/>}<span>{title}</span></span>}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu.SubMenu>
        )
    };
    //点击左侧菜单树的菜单按钮
    handleMenuClick = ({item, key, keyPath,title,tabKeys,panes}) => {
        if (!tabKeys.includes(key)) {
            tabKeys.push(key);
            panes.push({title:title,key:key,content:null});
            this.setState({tabKeys, panes, activeKey:key, selectedKeys:[key],});
        }else {
            this.setState({activeKey:key, selectedKeys:[key],})
        }
    };
    onOpenChange = (openKeys) => {
        //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
        if (openKeys.length === 0 || openKeys.length === 1) {
            this.setState({openKeys});
            return
        }
        //最新展开的菜单
        const latestOpenKey = openKeys[openKeys.length - 1];
        //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
        //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
        //只适用于3级菜单
        if (latestOpenKey.includes(openKeys[0])) {
            this.setState({openKeys});
        } else {
            this.setState({openKeys:[latestOpenKey]})
        }
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    onChange = (activeKey) => {
        this.setState({
            activeKey,
            selectedKeys:[activeKey]
        })
    };
    // 新增和删除页签的回调，在 type="editable-card" 时有效
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    remove = (targetKey) => {
        const {tabKeys, panes} = this.state;
        const index = tabKeys.indexOf(targetKey);
        tabKeys.splice(index,1);
        panes.splice(index,1);
        const activeKey = tabKeys.length>0?tabKeys[tabKeys.length-1]:'';
        this.setState({tabKeys, panes, activeKey, selectedKeys:[activeKey]})
    };
    add = () => {};
    getComponent = (componentName) => {
        const Component = (constants.componentMap)[componentName];
        if (Component){
            return <Component key={componentName}/>
        } {
            return null;
        }
    };

    render() {
        const {menus} = this.props;
        const {activeKey,panes,selectedKeys,openKeys} = this.state;
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div style={{height: '100vh'}}>
                        <div style={{height: '32px', background: 'rgba(255, 255, 255, .2)', margin: '16px'}}>
                        </div>
                        <Menu
                            onOpenChange={this.onOpenChange}
                            openKeys={openKeys}
                            selectedKeys={selectedKeys}
                            theme="dark"
                            mode='inline'>
                            {
                                menus.toJS() && menus.toJS().map(item => {
                                    return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                                })
                            }
                        </Menu>
                    </div>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0,boxShadow:"0 2px 8px #f0f1f2",position:'relative'}}>
                        <Button type="primary" onClick={this.toggle} style={{ marginBottom: 16 }}>
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </Button>
                    </Header>
                    <Content style={{margin: '0px 0px', padding: 24, background: '#fff', minHeight: 280,}}>
                        <div>
                            <Tabs onChange={this.onChange} activeKey={activeKey} onTabClick={this.onTabClick}
                                  type="editable-card" onEdit={this.onEdit} hideAdd>
                                {
                                    panes.map((pane) => {
                                        return (
                                            <TabPane tab={pane.title} key={pane.key}>
                                                {this.getComponent(pane.key)}
                                            </TabPane>
                                        )
                                    })
                                }
                            </Tabs>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
const mapState = (state) => {
    return {
        menus: state.getIn(['component','menus']),
    }
};
const mapDispatch = (dispatch) => {
    return {
    }
};
export default connect(mapState,mapDispatch)(Index);