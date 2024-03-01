import { useSelector } from "react-redux";
import { ProductState } from "redux/product/types";
import { AppState } from "redux/reducer";

export const useLoading = (): boolean => {
  return useSelector((state: AppState) => state.Product.loading)
}

export const useAddProductSuccess = (): boolean => {
  return useSelector((state: AppState) => state.Product.addProductSuccess)
}

export const useUpdateProductSuccess = (): boolean => {
  return useSelector((state: AppState) => state.Product.updateProductSuccess)
}

export const useProducts = (): ProductState['productInfos'] => {
  return useSelector((state: AppState) => state.Product.productInfos)
}

export const useProduct = (): ProductState['productInfo'] => {
  return useSelector((state: AppState) => state.Product.productInfo)
}