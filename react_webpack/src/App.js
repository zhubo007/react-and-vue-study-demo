import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Product from "./pages/product";

class App extends Component {
    render(){
        return (
            <Provider store={store}>
                <Product/>
            </Provider>
        )
    }
}

export default App;