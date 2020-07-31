import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import ProductReducer from './ProductReducer';



const rootReducer = combineReducers({
      ProductReducer,
  });

const store=createStore(
  rootReducer,applyMiddleware(thunk),
);

export default store;