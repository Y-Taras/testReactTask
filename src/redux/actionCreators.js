import axios from 'axios';
import {SET_FILTER_TERM, SET_FILTER_PRICE, SORT_BY_PRICE, ADD_API_DATA, ADD_TO_CART, REMOVE_FROM_CART} from './actions';

export function setFilterTerm(filterTerm) {
  return {type: SET_FILTER_TERM, payload: filterTerm};
}

export function setFilterPrice(filterPrice) {
  return {type: SET_FILTER_PRICE, payload: filterPrice};
}

export function changeSortKey(sortKey) {
  return {type: SORT_BY_PRICE, payload: sortKey};
}

export function addToCart(productId) {
  return {type: ADD_TO_CART, payload: productId};
}

export function removeFromCart(productId) {
  return {type: REMOVE_FROM_CART, payload: productId};
}


export function addAPIData(apiData) {
  return {type: ADD_API_DATA, payload: apiData};
}

export function getAPIDetails() {
  return (dispatch) => {
    axios
      .get("http://localhost:3000/productsList")
      .then(response => {
        dispatch(addAPIData(response.data));
      })
      .catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
  };
}
