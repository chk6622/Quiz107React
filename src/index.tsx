import React from 'react';
import ReactDOM from 'react-dom';
import AppStore from './redux/AppStore';
import {Provider} from 'react-redux';
import 'antd/dist/antd.css';
import './css/App.css';
import AppLayout from './components/Layout';


//aaa

ReactDOM.render(
  <Provider store={AppStore}>
    <AppLayout/>
  </Provider>
  ,
  document.getElementById('root')
);

