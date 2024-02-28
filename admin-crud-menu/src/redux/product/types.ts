import { Product } from "./interface";


export type ProductState = typeof initialState;

export const initialState = {
	loading: false,
	authenticated: false,
	unathorized: false,
	addProductSuccess: false,
	updateProductSuccess: false,
	productInfos: [] as Product[],
	productInfo: {} as Product 
}

export const SIGNIN = "SIGNIN";
export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILED = "SIGNIN_FAILED";

export const SIGNOUT = "SIGNOUT";
export const SIGNOUT_REQUEST = "SIGNOUT_REQUEST";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNOUT_FAILED = "SIGNOUT_FAILED";

export const UNAUTHORIZED = "UNAUTHORIZED";
export const UNAUTHORIZED_REQUEST = "UNAUTHORIZED_REQUEST";
export const UNAUTHORIZED_SUCCESS = "UNAUTHORIZED_SUCCESS";
export const UNAUTHORIZED_FAILED = "UNAUTHORIZED_FAILED";

export const GET_PRODUCTS = "GET_PRODUCTS"
export const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST"
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS"
export const GET_PRODUCTS_FAILED = "GET_PRODUCTS_FAILED"

export const GET_PRODUCT = "GET_PRODUCT"
export const GET_PRODUCT_REQUEST = "GET_PRODUCT_REQUEST"
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS"
export const GET_PRODUCT_FAILED = "GET_PRODUCT_FAILED"

export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS"
export const GET_PRODUCT_DETAILS_REQUEST = "GET_PRODUCT_DETAILS_REQUEST"
export const GET_PRODUCT_DETAILS_SUCCESS = "GET_PRODUCT_DETAILS_SUCCESS"
export const GET_PRODUCT_DETAILS_FAILED = "GET_PRODUCT_DETAILS_FAILED"

export const ADD_PRODUCT = "ADD_PRODUCT"
export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST"
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS"
export const ADD_PRODUCT_FAILED = "ADD_PRODUCT_FAILED"

export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST"
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS"
export const UPDATE_PRODUCT_FAILED = "UPDATE_PRODUCT_FAILED"

export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST"
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS"
export const DELETE_PRODUCT_FAILED = "DELETE_PRODUCT_FAILED"

//Payload

export interface SignInPayload {
  email?: string;
  password?: string;
}

export interface SignOutPayload {
  path?: string;
}

export interface GetProductsPayload extends Product {}

export interface AddProductPayload {
	name: string,
	category?: string,
	description: string,
	stocksLeft: number,
	cost: number,
	price: number,
	smallStocks?: number,
	mediumStocks?: number,
	largeStocks?: number,
	files: string,
	stocks128gbStorage?: number,
	stocks256gbStorage?: number,
	stocks1tbStorage?: number,
}

export interface UpdateProductPayload {
	key: string
	updatedFields: Partial<Product>
}

//Action
export type SignInAction = {
  type: typeof SIGNIN_REQUEST;
  payload: SignInPayload;
};

export type AddProductAction = {
	type: typeof ADD_PRODUCT_REQUEST
	payload: AddProductPayload
}

export type GetProductsAction = {
	type: typeof GET_PRODUCTS_REQUEST
}

export type GetProductDetailsAction = {
	type: typeof GET_PRODUCT_DETAILS_REQUEST
	payload: string
}

export type DeleteProductAction = {
	type: typeof DELETE_PRODUCT_REQUEST
	payload: string
}

export type UpdateProductAction = {
	type: typeof UPDATE_PRODUCT_REQUEST
	payload: UpdateProductPayload
}

export type SignOutAction = {
  type: typeof SIGNOUT_REQUEST;
  payload: SignOutPayload;
};