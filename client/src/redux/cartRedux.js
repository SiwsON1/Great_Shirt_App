export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const OPEN_CART = 'OPEN_CART';
export const CLOSE_CART = 'CLOSE_CART';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const openCart = (isOpen) => ({
  type: OPEN_CART,
  payload: isOpen,
});
export const closeCart = () => ({
    type: CLOSE_CART,
  });


const initialState = {
  cartOpen: false,
  cartItems: [],
};

const cartRedux = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    case OPEN_CART:
      return {
        ...state,
        cartOpen: action.payload,
      };
      case CLOSE_CART:
        return {
          ...state,
          cartOpen: false,
        };
    default:
      return state;
  }
};

export default cartRedux;