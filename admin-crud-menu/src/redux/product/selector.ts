import { AppState } from "../reducer";
import { createSelector } from "@reduxjs/toolkit";

const product = (state: AppState) => state.Product

export const isAuthenticated = createSelector(product, (val) => val.authenticated)
export const isUnauthorized = createSelector(product, (val) => val.unathorized)