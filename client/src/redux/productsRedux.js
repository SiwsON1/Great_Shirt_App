import axios from 'axios';
import { API_URL } from '../config';

//selectors
export const getProducts = ({products}) => products.data;
export const getProductById = (state, id) => {
  return state.products.data.find(x => x.id === id);
};
export const addUserStars = payload => ({ type: ADD_USER_STARS, payload });
// actions
const createActionName = actionName => `app/products/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');
const ADD_USER_STARS = createActionName('ADD_USER_STARS');

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });





export const loadProducts = payload => ({ payload, type: LOAD_PRODUCTS });

/* INITIAL STATE */
const initialState = {
  data: [],
  requests: {},
};

// action creators
const productsRedux = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...statePart, data: [...action.payload] };
    case START_REQUEST:
      return { ...statePart, requests: {...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false }} };
    case END_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true }} };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };
      case ADD_USER_STARS:
      return {
        ...statePart,
        data: statePart.data.map(product =>
          product.id === action.payload.id
            ? { ...product, userStars: action.payload.userStars }
            : product
        )
      };
    default:
      return statePart;
  };
};

// thunk

export const loadProdRequest = () => {
  return async dispatch => {

    dispatch(startRequest({ name: 'LOAD_PRODUCTS' }));
    try {

      let res = await axios.get(`${API_URL}/api/products`);
      console.log(res.data);
      dispatch(loadProducts(res.data));
      dispatch(endRequest({ name: 'LOAD_PRODUCTS' }));

    } catch(e) {
      dispatch(errorRequest({ name: 'LOAD_PRODUCTS' ,error: e.message}));
    }

  };
};



export default productsRedux;