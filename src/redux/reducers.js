import {combineReducers} from 'redux';
import {
  SET_FILTER_TERM,
  SET_FILTER_PRICE,
  SORT_BY_PRICE,
  ADD_API_DATA,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_PRODUCTS_QUANTITY
} from './actions';

const initialState = {
  addedIds: [],
  quantityById: {}
};

const filterTerm = (state = '', action) => {
  if (action.type === SET_FILTER_TERM) {
    return action.payload;
  }
  return state;
};

const filterPrice = (state = {min: 1, max: 20}, action) => {
  if (action.type === SET_FILTER_PRICE) {
    return action.payload;
  }
  return state;
};

const sortKey = (state = false, action) => {
  if (action.type === SORT_BY_PRICE) {
    return action.payload;
  }
  return state;
};

const handleCart = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.payload) !== -1) {
        return state
      }
      return [...state, action.payload];
    case REMOVE_FROM_CART:
      return state.filter(productId => action.payload !== productId);
    default:
      return state
  }
};


const quantityById = (state = initialState.quantityById, action) => {
  const {payload} = action;
  switch (action.type) {
    case ADD_TO_CART:
      return Object.assign({}, state, {[payload]: (state[payload] || 0) + 1});
    case REMOVE_FROM_CART:
      if (!state[payload]) {
        return state
      }
      return Object.assign({}, state, {[payload]: (state[payload] || 0) - 1});
    case SET_PRODUCTS_QUANTITY:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
};


const apiData = (state = [], action) => {
  if (action.type === ADD_API_DATA) {
    return action.payload;
  }
  return state;
};

const rootReducer = combineReducers({filterTerm, filterPrice, handleCart, quantityById, apiData, sortKey});

export default rootReducer;
