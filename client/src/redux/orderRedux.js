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





const createActionName = actionName => `app/order/${actionName}`;

const ADD = createActionName('ADD');
const DELETE = createActionName('DELETE');
const ADD_ORDER = createActionName('ADD_ORDER');
const OPEN_CART = createActionName('OPEN_CART');
const CLOSE_CART = createActionName('CLOSE_CART');
const EDIT_ORDER = createActionName('EDIT_ORDER');
const DELETE_ALL = createActionName('DELETE_ALL');
const FINISH_ORDER = createActionName('FINISH_ORDER');
const CLEAR = createActionName('CLEAR')
const ADD_TO_CART = createActionName('ADD_TO_CART')

const initialState = {
  data: [],
  order: [],
  finishedOrder: [],
  cart:[],
  cartOpen: false,
};

const orderRedux = (statePart = initialState, action) => {
    switch(action.type) {
      case ADD:
        return { ...statePart, cart: [...statePart.cart, action.payload] };
        case DELETE:
          return { ...statePart, data: statePart.data.filter(order => order.orderId !== action.payload)};
        case ADD_ORDER:
          return { ...statePart, order: [...statePart.order, {...action.payload}]}
        case EDIT_ORDER:
          return {...statePart, data: statePart.data.map(item => item.id === action.payload.id ?  {...item, ...action.payload} : item)}
        case DELETE_ALL:
          return {...statePart, data: [], order: []}
        case FINISH_ORDER:
          return {...statePart, data: [], order: [], finishedOrder: [...statePart.finishedOrder, {...action.payload}]}
        case CLEAR:
          return {...statePart, data: [], order: [], finishedOrder: []}
          case OPEN_CART:
            return { ...statePart, cartOpen: action.payload };
          case CLOSE_CART:
            return { ...statePart, cartOpen: false,};
            case ADD_TO_CART:
            return {
              ...statePart,
              cart: [
                ...statePart.cart,
                {
                  id: uuidv4(),
                  product: action.payload.product,
                  amount: action.payload.amount
                }
              ]
            };
        default:
          return statePart;
};
};


export default orderRedux;