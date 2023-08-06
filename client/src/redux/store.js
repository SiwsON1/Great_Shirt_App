import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsRedux from './productsRedux';
import orderRedux from './orderRedux';
import cartRedux from './cartRedux';



const subreducers = {
  products: productsRedux,
  order: orderRedux,
  cart: cartRedux,
}

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,

  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;