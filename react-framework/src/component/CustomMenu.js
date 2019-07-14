import React, {PureComponent,Fragment} from 'react'
import {connect } from 'react-redux';
import {Menu, Icon} from 'antd'

class CustomMenu extends PureComponent{

    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            panes:[],
            selectedKeys:[],//菜单树激活的key，必须是array类型的
            tabKeys:[],
            activeKey:'',//Tab标签激活的ID
            openKeys:[],//展开的父级目录的ID
        };
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
            this.setState({tabKeys, panes, activeKey:key});
        }else {
            this.setState({activeKey:key})
        }
        this.setState({selectedKeys:[key]});

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
    render(){
        const {menus} = this.props;
        const {selectedKeys,openKeys} = this.state;

        return (
            <Fragment>
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
            </Fragment>
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
export default connect(mapState,mapDispatch)(CustomMenu);