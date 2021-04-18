import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
//import Product from "./pages/product/index";
// import {BrowserRouter, Route ,Switch} from 'react-router-dom';
import MainApp from "./component/index";
const {BrowserRouter,Route,Switch} = require('react-router-dom');

const App: React.FunctionComponent = () => {
    return (
            <Provider store={store}>
                {/*<Product/>*/}
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/market_monitor" component={MainApp}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
    );
};
export default App;