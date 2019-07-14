import React, { Component } from 'react';
import { Tabs } from 'antd';
import {connect } from 'react-redux';
import {actionCreator,constants} from "./../component/store";

const TabPane = Tabs.TabPane;

class MenuTab extends Component{

    onChange = (activeKey) => {
        this.props.changeActiveKey(activeKey,[activeKey]);
    };
    // 新增和删除页签的回调，在 type="editable-card" 时有效
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    remove = (targetKey) => {
        const {panes,tabKeys} = this.props;
        this.props.removeKey(targetKey,panes.toJS(),tabKeys.toJS());
    };
    add = () => {
    };
    getComponent = (componentName) => {
        const Component = (constants.componentMap)[componentName];
        if (Component){
            return <Component key={componentName}/>
        } {
            return null;
        }
    };
    render() {
        const {activeKey, panes} = this.props;
        return (
            <div>
                <Tabs onChange={this.onChange} activeKey={activeKey} onTabClick={this.onTabClick}
                      type="editable-card" onEdit={this.onEdit} hideAdd>
                    {
                        (panes.toJS()).map((pane) => {
                            return (
                                <TabPane tab={pane.title} key={pane.key}>
                                    {this.getComponent(pane.key)}
                                </TabPane>
                            )
                        })
                    }
                </Tabs>
            </div>
        )
    }
}
const initMapStateToProps = (state) => {
    return {
        menus: state.getIn(['component','menus']),
        openKeys: state.getIn(['component','openKeys']),
        selectedKeys: state.getIn(['component','selectedKeys']),
        activeKey:state.getIn(['component','activeKey']),
        panes:state.getIn(['component','panes']),
        tabKeys:state.getIn(['component','tabKeys']),
    }
};
const initMapDispatchToProps = (dispatch) => {
    return {
        removeKey(targetKey,panes,tabKeys){
            const index = tabKeys.indexOf(targetKey);
            tabKeys.splice(index,1);
            panes.splice(index,1);
            const activeKey = tabKeys.length>0?tabKeys[tabKeys.length-1]:'';
            dispatch(actionCreator.addRmTabPanes(tabKeys,panes,activeKey,activeKey===''?[]:[activeKey]));
        },
        changeActiveKey(activeKey){
            dispatch(actionCreator.changeActiveKey(activeKey,[activeKey]));
        }
    }
};
export default connect(initMapStateToProps,initMapDispatchToProps)(MenuTab);