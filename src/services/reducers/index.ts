import { combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  CLOSE_MODAL,
  CLOSE_ORDER_MODAL,
  DELETE_CONSTRUCTOR_INGREDIENT,
  DELETE_SELECTED_INGREDIENT_INFO,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_SELECTED_INGREDIENT_INFO,
  MOVE_CONSTRUCTOR_INGREDIENT,
  OPEN_MODAL,
  OPEN_ORDER_MODAL,
} from '../actions';

const initialStateIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

const getIngredientsReducer = (state = initialStateIngredients, action: any) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.payload,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const initialStateModals = {
  isModalOpened: false,
  isOrderModalOpened: false,
};

const modalReducer = (state = initialStateModals, action: any) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isModalOpened: true,
        isOrderModalOpened: false,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isModalOpened: false,
        isOrderModalOpened: false,
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalOpened: true,
        isModalOpened: false,
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalOpened: false,
        isModalOpened: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const initialStateOrder = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

const orderReducer = (state = initialStateOrder, action: any) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.payload,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const initialStateConstructor = {
  constructorIngredients: [],
  isBuns: null,
};

const getConstructorIngredientReducer = (state = initialStateConstructor, action: any) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          isBuns: action.payload,
        };
      }
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, { ...action.payload, ingredientId: uuidv4() }],
      };
    }
    case DELETE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients.filter((i: any) => i.ingredientId !== action.payload)],
      };
    }
    case MOVE_CONSTRUCTOR_INGREDIENT: {
      const { dragIndex, hoverIndex } = action.payload;
      const ingredients = [...state.constructorIngredients];
      ingredients.splice(dragIndex, 0, ingredients.splice(hoverIndex, 1)[0]);
      return {
        ...state,
        constructorIngredients: ingredients,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const initialStateIngredientInfo = {
  currentIngredient: null,
};

export const getIngredientInfoReducer = (state = initialStateIngredientInfo, action: any) => {
  switch (action.type) {
    case GET_SELECTED_INGREDIENT_INFO: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case DELETE_SELECTED_INGREDIENT_INFO: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export const rootReducer = combineReducers({
  burgerIngredients: getIngredientsReducer,
  burgerIngredient: getIngredientInfoReducer,
  modal: modalReducer,
  order: orderReducer,
  constructorOfOrder: getConstructorIngredientReducer,
});
