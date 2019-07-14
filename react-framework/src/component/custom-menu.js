import React, {PureComponent} from 'react'
import {connect } from 'react-redux';
import {Menu, Icon} from 'antd'
import {actionCreator} from "./store";
//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class CustomMenu extends PureComponent {

    componentDidMount() {
        // const pathname = this.props.location.pathname;
        // this.props.initKeys(pathname);
    }

    componentWillReceiveProps(nextProps) {
        //当点击面包屑导航时，侧边栏要同步响应
        // const pathname = nextProps.location.pathname;
        // const { changeSelectedKeys } = this.props;
        // if (this.props.location.pathname !== pathname) {
        //     changeSelectedKeys([pathname]);
        // }
    }

    render() {
        const {openKeys, selectedKeys,onOpenChange, menus} = this.props;
        return (
            <Menu
                onOpenChange={onOpenChange}
                openKeys={openKeys.toArray()}
                selectedKeys={selectedKeys.toArray()}
                theme="dark"
                mode='inline'>
                {
                    menus.toJS() && menus.toJS().map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu>
        )
    }

    renderMenuItem = ({key, icon, title}) => {
        const { handleMenuClick,tabKeys,panes } = this.props;
        return (
            <Menu.Item key={key} title={title} onClick={(paraMap) => handleMenuClick({...paraMap,title,tabKeys:tabKeys.toArray(),panes:panes.toJS()})}>
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
}
const initMapStateToProps = (state) => {
    return {
        menus: state.getIn(['component','menus']),
        openKeys: state.getIn(['component','openKeys']),
        selectedKeys: state.getIn(['component','selectedKeys']),
        tabKeys: state.getIn(['component','tabKeys']),
        panes: state.getIn(['component','panes'])
    }
};
const initMapDispatchToProps = (dispatch) => {
    return {
        changeSelectedKeys(keys){
            dispatch(actionCreator.changeSelectedKeys(keys));
        },
        handleMenuClick({item, key, keyPath,title,tabKeys,panes}){
            if (!tabKeys.includes(key)) {
                tabKeys.push(key);
                panes.push({title:title,key:key,content:null});
                dispatch(actionCreator.addRmTabPanes(tabKeys,panes,key,[key]));
            }else {
                dispatch(actionCreator.changeActiveKey(key,[key]));
            }
        },
        changeOpenKeys(keys){
            dispatch(actionCreator.changeOpenKeys(keys))
        },
        changeKeys(selectedKeys,openKeys){
            dispatch(actionCreator.changeKeys(selectedKeys,openKeys))
        },
        onOpenChange(openKeys){
            //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
            if (openKeys.length === 0 || openKeys.length === 1) {
                dispatch(actionCreator.changeOpenKeys(openKeys));
                return
            }
            //最新展开的菜单
            const latestOpenKey = openKeys[openKeys.length - 1];
            //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
            //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
            //只适用于3级菜单
            if (latestOpenKey.includes(openKeys[0])) {
                dispatch(actionCreator.changeOpenKeys(openKeys));
            } else {
                dispatch(actionCreator.changeOpenKeys([latestOpenKey]));
            }
        },
        initKeys(pathname){
            // 防止页面刷新侧边栏又初始化了
            //获取当前所在的目录层级
            const rank = pathname.split('/');
            switch (rank.length) {
                case 2 :  //一级目录
                    dispatch(actionCreator.changeSelectedKeys([pathname]));
                    break;
                case 5 : //三级目录，要展开两个subMenu
                    dispatch(actionCreator.changeKeys([pathname], [rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')]));
                    break;
                default :
                    dispatch(actionCreator.changeKeys([pathname], [pathname.substr(0, pathname.lastIndexOf('/'))]));
            }
        }
    }
};
export default connect(initMapStateToProps,initMapDispatchToProps)(CustomMenu)