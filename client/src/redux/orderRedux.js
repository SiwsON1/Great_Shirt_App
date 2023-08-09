import { v4 as uuidv4 } from 'uuid'


export const getOrders = ({order}) => order.data;
export const getOrdersList  = ({order}) => order.order;
export const getOrderById = ({order}, id)  => order.order.find(oid => oid.orderListId === id);
export const getFinishedOrder = ({order}) => order.finishedOrder;
export const getCartOpen = ({order}) => order.cartOpen;

export const openCart = (isOpen) => ({type: OPEN_CART, payload: isOpen});
export const addOrder= (payload) => ({type: ADD, payload});
export const closeCart = () => ({type: CLOSE_CART});
export const addToCart = (product, amount = 1) => ({ type: ADD_TO_CART, payload: { product, amount }});
export const getAllProductsInCart = (state) => state.order.cart.map(order => ({
  ...order.product,
  amount: order.amount
}));
export const getOnlyProductsInCart = (state) => state.order.cart.map(cart => cart.product);
export const getTotalProductsInCart = (state) => state.order.cart.reduce((acc, order) => acc + order.amount, 0);
export const getTotalCartValue = (state) => state.order.cart.reduce((acc, order) => acc + order.product.price * order.amount, 0);


export const removeFromCart = (productId) => ({ type: REMOVE_FROM_CART, payload: productId });




const createActionName = actionName => `app/order/${actionName}`;

const ADD = createActionName('ADD');
const OPEN_CART = createActionName('OPEN_CART');
const CLOSE_CART = createActionName('CLOSE_CART');
const ADD_TO_CART = createActionName('ADD_TO_CART')
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');

const initialState = {
  cart:[],
  cartOpen: false,
};

const orderRedux = (statePart = initialState, action) => {
    switch(action.type) {
          case OPEN_CART:
            return { ...statePart, cartOpen: action.payload };
          case CLOSE_CART:
            return { ...statePart, cartOpen: false,};
            case ADD_TO_CART:
            return {
              ...statePart,
              cart: [
                ...statePart.cart,
                {...action.payload}
              ]
            };
            case REMOVE_FROM_CART:
            return {
                ...statePart,
                cart: statePart.cart.filter(item => item.product.id !== action.payload)
            };
        default:
          return statePart;
};
};


export default orderRedux;