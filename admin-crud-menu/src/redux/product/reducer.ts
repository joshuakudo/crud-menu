import * as types from "./types";

import { AnyAction } from "redux";

const userReducer = (
  state: types.ProductState = types.initialState,
  action: AnyAction
): types.ProductState => {
  switch (action.type) {
    case types.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        addProductSuccess: true
      };
    case types.ADD_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        addProductSuccess: false
      };
      case types.GET_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case types.GET_PRODUCT_SUCCESS:
        console.log('payload', action.payload)
        return {
          ...state,
          loading: false,
          productInfos: action.payload
        };
      case types.GET_PRODUCT_FAILED:
        return {
          ...state,
          loading: false,
          
        };
    default:
      return state;
  }
};

export default userReducer;
