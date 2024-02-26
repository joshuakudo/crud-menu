import { Effect, ForkEffect, call, put, takeEvery } from "@redux-saga/core/effects";
import * as types from './types';
import { getDatabase, ref, set, push, get } from "firebase/database";
import  app  from "firebaseInit";

function* AddProduct({payload}: types.AddProductAction) {
  try {
    const db = getDatabase(app)
    const newDocRef = push(ref(db,"product"))

    yield put({
      type: types.ADD_PRODUCT_SUCCESS,
      payload: set(newDocRef, {
        name: payload.name,
        category: payload.category,
        description: payload.description,
        stocksLeft: payload.stocksLeft,
        cost: payload.cost,
        price: payload.price,
        smallStocks: payload.smallStocks,
        mediumStocks: payload.mediumStocks,
        largeStocks: payload.largeStocks,
        files: payload.files
      })
    })

  } catch (err) {
    yield put({
      type: types.ADD_PRODUCT_FAILED,
    })
  }
}

function* GetProduct(): Generator<Effect, void, any> {
  try {

    const db = getDatabase(app);
    const dbRef = ref(db, 'product');
    const snapshot = yield call(get, dbRef);

    if (snapshot.exists()) {
      const productData = snapshot.val();

      // Dispatch an action with the data received from Firebase
      yield put({
        type: types.GET_PRODUCT_SUCCESS,
        payload: productData,
      });
    } else {
      // Handle the case where the data doesn't exist
      yield put({
        type: types.GET_PRODUCT_FAILED,
      });
    }
  } catch (err) {
    console.error('Error getting product:', err);

    // Dispatch an action for the failure case
    yield put({
      type: types.GET_PRODUCT_FAILED,
    });
  }
}

const ProductSaga: ForkEffect[] = [
takeEvery(types.ADD_PRODUCT_REQUEST, AddProduct),
takeEvery(types.GET_PRODUCT_REQUEST, GetProduct)
];

export default ProductSaga;