import * as types from "./types";

export const addProductRequest = (payload: types.AddProductPayload): types.AddProductAction => {
  return {
    type: types.ADD_PRODUCT_REQUEST,
    payload
  }
}

export const getProductRequest = (): types.GetProductAction => {
  return {
    type: types.GET_PRODUCT_REQUEST,
  }
}