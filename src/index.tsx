import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './components/ProductList';
import AppStore from './redux/AppStore';
import {Provider} from 'react-redux';




ReactDOM.render(
  <Provider store={AppStore}>
    <ProductList/>
  </Provider>
  ,
  document.getElementById('root')
);

