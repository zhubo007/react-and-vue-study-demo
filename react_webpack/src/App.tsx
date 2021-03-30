import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import Product from "./pages/product/index";

const App: React.FunctionComponent = () => {
    return (
            <Provider store={store}>
                <Product/>
            </Provider>
    );
};
export default App;