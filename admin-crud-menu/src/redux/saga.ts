import { StrictEffect, all } from "@redux-saga/core/effects";
import ProductSaga from "./product/saga";


export default function* rootSaga(): Generator<StrictEffect> {
  yield all([
    ...ProductSaga,
  ])
}