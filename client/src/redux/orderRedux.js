import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { API_URL } from '../config';

export const getCartOpen = ({ order }) => order.cartOpen;

export const openCart = (isOpen) => ({ type: OPEN_CART, payload: isOpen });
export const closeCart = () => ({ type: CLOSE_CART });
export const addToCart = (product, amount) => ({
  type: ADD_TO_CART,
  payload: { product, amount },
});

export const getCart = (state) => state.order.cart;
export const getOnlyProductsInCart = (state) =>
  state.order.cart.map((cart) => cart.product);
export const getOnlyProductsInCartAmount = (state) =>
  state.order.cart.map((cart) => cart.amount);
export const getTotalProductsInCart = (state) =>
  state.order.cart.reduce((acc, order) => acc + order.amount, 0);
export const getTotalCartValue = (state) =>
  state.order.cart.reduce(
    (acc, order) => acc + order.product.price * order.amount,
    0,
  );
export const saveCartToStorage = () => (dispatch, getState) => {
  const cart = getState().order.cart;
  localStorage.setItem('userCart', JSON.stringify(cart));
};

export const loadCartFromStorage = () => (dispatch) => {
  const savedCart = localStorage.getItem('userCart');
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    dispatch(setCartFromStorage(parsedCart));
  }
};
export const clearCart = () => ({ type: CLEAR_CART });

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const getProductAmountInCart = (state, productId) => {
  const item = state.order.cart.find((item) => item.product.id === productId);
  return item ? item.amount : 0;
};
export const getNoteFromCartById = (state, productId) => {
  const productInCart = state.order.cart.find(p => p.product.id === productId);
  return productInCart ? productInCart.note : '';
};
export const updateCart = (payload) => ({ payload, type: UPDATE_CART });
export const checkout = (payload) => ({ payload, type: CHECKOUT });
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });
export const purchase = (payload) => ({ payload, type: PURCHASE });
export const setCartFromStorage = (cart) => ({
  type: SET_CART_FROM_STORAGE,
  payload: cart,
});
export const addNoteToProduct = (productId, note) => ({
  type: ADD_NOTE_TO_PRODUCT,
  payload: { productId, note },
});

const createActionName = (actionName) => `app/order/${actionName}`;

const OPEN_CART = createActionName('OPEN_CART');
const CLOSE_CART = createActionName('CLOSE_CART');
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const ADD_TO_ORDERLIST = createActionName('ADD_TO_CART');
const UPDATE_CART = createActionName('UPDATE_CART');
const CHECKOUT = createActionName('CHECKOUT');
const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const PURCHASE = createActionName('PURCHASE');
const SET_CART_FROM_STORAGE = 'SET_CART_FROM_STORAGE';
const CLEAR_CART = createActionName('CLEAR_CART');
export const ADD_NOTE_TO_PRODUCT = createActionName('ADD_NOTE_TO_PRODUCT');

/* THUNKS */

export const purchaseRequest = (orderData) => {
  console.log('orderData',orderData);

  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const orderItems = orderData.products.map(product => ({
        quantity: product.amount,
        productId: product.product.id

      }));
      console.log('to co w orderItems',orderItems);
      const orderStructure = {
        orderId: uuidv4(),
        amount: orderData.totalPrice,
        email: orderData.client.email,
        name: orderData.client.name,
        address: orderData.client.address,
        payment: orderData.client.payment,
        delivery: orderData.client.delivery,
        orderItems: orderItems
      };

      let res = await axios.post(`${API_URL}/api/orders`, orderStructure);
      dispatch(purchase(res));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

const initialState = {
  cart: [],
  cartOpen: false,
  order: [],
  request: {
    pending: false,
    error: null,
    success: null,
  },
};

const orderRedux = (statePart = initialState, action) => {
  switch (action.type) {
    case OPEN_CART:
      return { ...statePart, cartOpen: action.payload };
    case CLOSE_CART:
      return { ...statePart, cartOpen: false };
    case ADD_TO_CART:
      if (
        statePart.cart.find(
          (item) => item.product.id === action.payload.product.id,
        )
      ) {
        return {
          ...statePart,
          cart: statePart.cart.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, amount: item.amount + action.payload.amount }
              : item,
          ),
        };
      } else {
        return {
          ...statePart,
          cart: [...statePart.cart, { ...action.payload }],
        };
      }
    case UPDATE_CART: {
      return {
        ...statePart,
        cart: statePart.cart.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, amount: action.payload.amount }
            : item,
        ),
      };
    }
    case REMOVE_FROM_CART:
      return {
        ...statePart,
        cart: statePart.cart.filter(
          (item) => item.product.id !== action.payload,
        ),
      };
    case CHECKOUT: {
      return {
        ...statePart,
        order: [...statePart.order],
        cartTotalPrice: action.payload.cartTotalPrice,
      };
    }
    case ADD_TO_ORDERLIST:
      return {
        ...statePart,
        order: [...statePart.order, { ...action.payload }],
      };
    case START_REQUEST:
      return {
        ...statePart,
        request: { pending: true, error: null, success: false },
      };
    case END_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: null, success: true },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: action.error, success: false },
      };
    case PURCHASE:
      return { ...statePart, order: [...statePart.order, action.payload] };
    case SET_CART_FROM_STORAGE:
      return {
        ...statePart,
        cart: action.payload,
      };
    case CLEAR_CART:
      return { ...statePart, cart: [] };
      case ADD_NOTE_TO_PRODUCT: {
        return {
          ...statePart,
          cart: statePart.cart.map(item =>
            item.product.id === action.payload.productId
              ? { ...item, note: action.payload.note }
              : item
          ),
        };
      }
    default:
      return statePart;
  }

};

export default orderRedux;
