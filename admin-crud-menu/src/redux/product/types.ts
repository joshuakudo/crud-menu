import { Product } from "./interface";


export type ProductState = typeof initialState;

export const initialState = {
	loading: false,
	addProductSuccess: false,
	updateProductSuccess: false,
	productInfos: [] as Product[],
	productInfo: {} as Product 
}

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
}

//Action
export type AddProductAction = {
	type: typeof ADD_PRODUCT_REQUEST
	payload: AddProductPayload
}

export type GetProductAction = {
	type: typeof GET_PRODUCT_REQUEST
}

