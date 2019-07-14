import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter, Route ,Switch} from 'react-router-dom';
import MainPage from './component/index'
import store from './store';
import { GlobalStyle } from './style';
import moment from 'moment';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class App extends PureComponent {
    render(){
        return (
            <Provider store={store}>
                <GlobalStyle/>
                <LocaleProvider locale={zhCN}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/market_monitor" component={MainPage}/>
                    </Switch>
                </BrowserRouter>
                </LocaleProvider>
            </Provider>
        )
    }
}
ReactDOM.render(<App/>, document.getElementById("root"));

