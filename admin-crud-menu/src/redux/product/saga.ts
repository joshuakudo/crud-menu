import { Effect, ForkEffect, call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import * as types from './types';
import { getDatabase, ref, set, push, get, remove, update } from "firebase/database";
import  app  from "firebaseInit";
import { Product } from "./interface";
import { UserCredential, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { clearLocalStorage } from "../../utilities";

function* SignIn({ payload }: types.SignInAction): Generator<any, void, UserCredential> {
  try {
    const auth = getAuth(app);

    const userCredential: UserCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      payload?.email!,
      payload?.password!
    );

    const user = userCredential.user;

    if (user) {
      yield put({
        type: types.SIGNIN_SUCCESS,
      });
    }
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.error('Error signing in', errorCode, errorMessage);
    yield put({
      type: types.SIGNIN_FAILED,
      payload,
    });
  }
}

function* SignOut({ payload }: types.SignOutAction) {
  //removing auth and refresh token
  yield call(clearLocalStorage);

  yield put({
    type: types.SIGNOUT_SUCCESS,
  });
}

function* AddProduct({payload}: types.AddProductAction) {
  try {
    const db = getDatabase(app)
    const newDocRef = push(ref(db,"menu"))
    console.log(app)
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

    yield put({
      type: types.GET_PRODUCTS_REQUEST,
    });

  } catch (err) {
    yield put({
      type: types.ADD_PRODUCT_FAILED,
    })
  }
}

function* GetProducts(): Generator<Effect, void, any> {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, 'menu');
    const snapshot = yield call(get, dbRef);

    if (snapshot.exists()) {
      const productData: Record<string, Product> = snapshot.val();
      console.log('products', productData);

      // Convert the productData object into an array of Product objects
      const productList: Product[] = Object.entries(productData).map(
        ([key, value]) => ({
          ...value,
          key,
        })
      );

      console.log('list', productList);

      // Dispatch an action with the data received from Firebase
      yield put({
        type: types.GET_PRODUCTS_SUCCESS,
        payload: productList,
      });
    } else {
      // Handle the case where the data doesn't exist
      yield put({
        type: types.GET_PRODUCTS_FAILED,
      });
    }
  } catch (err) {
    console.error('Error getting product:', err);

    // Dispatch an action for the failure case
    yield put({
      type: types.GET_PRODUCTS_FAILED,
    });
  }
}

function* GetProductDetais({ payload }: types.GetProductDetailsAction): Generator<Effect, void, any> {
  try {
    const db = getDatabase(app);
    const specificProductRef = ref(db, `menu/${payload}`);
    const snapshot = yield call(get, specificProductRef);

    if (snapshot.exists()) {
      const specificProductData: Product = snapshot.val();
      const productWithKey = {
        ...specificProductData,
        key: payload,
      };

      // Dispatch an action with the data received from Firebase, including the key
      yield put({
        type: types.GET_PRODUCT_DETAILS_SUCCESS,
        payload: productWithKey,
      });
    } else {
      yield put({
        type: types.GET_PRODUCT_DETAILS_FAILED,
      });
    }
  } catch (err) {
    console.error('Error getting specific product:', err);

    yield put({
      type: types.GET_PRODUCT_DETAILS_FAILED,
    });
  }
}

function* DeleteProduct({payload}: types.DeleteProductAction): Generator<Effect, void, any> {
  try {
    const db = getDatabase(app);
    const specificProductRef = ref(db, `menu/${payload}`);

    yield call(remove, specificProductRef);

    yield put({
      type: types.GET_PRODUCTS_REQUEST,
    });
  } catch (err) {
    console.error('Error deleting specific product:', err);

    yield put({
      type: types.DELETE_PRODUCT_FAILED,
    });
  }
}

function* UpdateProduct({ payload }: types.UpdateProductAction): Generator<Effect, void, any> {
  try {
    const { key, updatedFields } = payload;

    const db = getDatabase(app);
    const specificProductRef = ref(db, `menu/${key}`);

    // Update the specific product with the new values
    yield call(update, specificProductRef, updatedFields);

    // Dispatch an action for successful update
    yield put({
      type: types.UPDATE_PRODUCT_SUCCESS,
      payload: {
        key,
        updatedFields,
      },
    });
  } catch (err) {
    console.error('Error updating specific product:', err);

    // Dispatch an action for the failure case
    yield put({
      type: types.UPDATE_PRODUCT_FAILED,
    });
  }
}

const ProductSaga: ForkEffect[] = [
takeEvery(types.ADD_PRODUCT_REQUEST, AddProduct),
takeEvery(types.GET_PRODUCTS_REQUEST, GetProducts),
takeEvery(types.GET_PRODUCT_DETAILS_REQUEST, GetProductDetais),
takeEvery(types.DELETE_PRODUCT_REQUEST, DeleteProduct),
takeEvery(types.UPDATE_PRODUCT_REQUEST, UpdateProduct),
takeLatest(types.SIGNIN_REQUEST, SignIn),
takeLatest(types.SIGNOUT_REQUEST, SignOut),
];

export default ProductSaga;