import { AnyAction, combineReducers } from "redux";

import Product from "./product/reducer"


export const appReducer = combineReducers({
  Product
})

const rootReducer = (state: any, action: AnyAction) => {
  return appReducer(state, action);
}

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;