import * as types from "./types";

export const signinRequest = (
  payload: types.SignInPayload
): types.SignInAction => {
  return {
    type: types.SIGNIN_REQUEST,
    payload,
  };
};

export const signoutRequest = (
  payload: types.SignOutPayload
): types.SignOutAction => {
  return {
    type: types.SIGNOUT_REQUEST,
    payload,
  };
};

export const addProductRequest = (
  payload: types.AddProductPayload
): types.AddProductAction => {
  return {
    type: types.ADD_PRODUCT_REQUEST,
    payload,
  };
};

export const getProductsRequest = (): types.GetProductsAction => {
  return {
    type: types.GET_PRODUCTS_REQUEST,
  };
};

export const getProductDetailsRequest = (
  payload: string
): types.GetProductDetailsAction => {
  return {
    type: types.GET_PRODUCT_DETAILS_REQUEST,
    payload,
  };
};

export const deleteProductRequest = (
  payload: string
): types.DeleteProductAction => {
  return {
    type: types.DELETE_PRODUCT_REQUEST,
    payload,
  };
};

export const updateProductRequest = (
  payload: types.UpdateProductPayload
): types.UpdateProductAction => {
  return {
    type: types.UPDATE_PRODUCT_REQUEST,
    payload,
  };
};
