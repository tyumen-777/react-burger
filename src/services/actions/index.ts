//Get ingredients
import { BASE_URL } from '../../utils/constants';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredients = () => {
  return (dispatch: any) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetch(`${BASE_URL}/ingredients`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
};

//Toggle modals
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const openModal = () => {
  return {
    type: OPEN_MODAL,
  };
};
export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
export const openOrderModal = () => {
  return {
    type: OPEN_ORDER_MODAL,
  };
};
export const closeOrderModal = () => {
  return {
    type: CLOSE_ORDER_MODAL,
  };
};

//User order
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const createOrder = (ingredients: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ingredients: ingredients }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then(res => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const MOVE_CONSTRUCTOR_INGREDIENT = 'MOVE_CONSTRUCTOR_INGREDIENT';

export const addConstructorIngredient = (ingredient: any) => {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    payload: ingredient,
  };
};
export const deleteConstructorIngredient = (ingredient: any) => {
  return {
    type: DELETE_CONSTRUCTOR_INGREDIENT,
    payload: ingredient,
  };
};
export const moveConstructorIngredient = ({ dragIndex, hoverIndex }: any) => {
  return {
    type: MOVE_CONSTRUCTOR_INGREDIENT,
    payload: { dragIndex, hoverIndex },
  };
};

//Selected ingredient

export const GET_SELECTED_INGREDIENT_INFO = 'GET_SELECTED_INGREDIENT_INFO';
export const DELETE_SELECTED_INGREDIENT_INFO = 'DELETE_SELECTED_INGREDIENT_INFO';

export const getIngredientInfo = (ingredient: any) => {
  return {
    type: GET_SELECTED_INGREDIENT_INFO,
    payload: ingredient,
  };
};
export const deleteIngredientInfo = () => {
  return {
    type: DELETE_SELECTED_INGREDIENT_INFO,
  };
};
