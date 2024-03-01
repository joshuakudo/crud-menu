import * as types from "./types";

import { AnyAction } from "redux";


const userReducer = (
  state: types.ProductState = types.initialState,
  action: AnyAction
): types.ProductState => {
  switch (action.type) {
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };
    case types.SIGNIN_FAILED:
      return {
        ...state,
        authenticated: false,
        unathorized: true,
      };
    case types.SIGNOUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
      };
    case types.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        addProductSuccess: false
      };
    case types.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        addProductSuccess: true,
      };
    case types.ADD_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        addProductSuccess: false,
      };
    case types.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_PRODUCTS_SUCCESS:
      console.log("payloadasas", action.payload);
      return {
        ...state,
        loading: false,
        productInfos: action.payload,
      };
    case types.GET_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
      };
    case types.GET_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_PRODUCT_DETAILS_SUCCESS:
      console.log("payloads", action.payload);
      return {
        ...state,
        loading: false,
        productInfo: action.payload,
      };
    case types.GET_PRODUCT_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
      };
      case types.UPDATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          addProductSuccess: false,
        };
    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        updateProductSuccess: true,
        productInfos: state.productInfos?.map((product) =>
          product.key === action.payload.key
            ? { ...product, ...action.payload.updatedFields }
            : product
        ),
        productInfo: {
          ...state.productInfo,
          ...action.payload.updatedFields,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
