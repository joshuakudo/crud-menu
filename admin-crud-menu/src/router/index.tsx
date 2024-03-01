import React from "react";
import { Route, Routes } from "react-router-dom";
import PrimaryLayout from "../components/Layout";
import Product from "../pages/Product";
import ComingSoon from "../components/ComingSoon";
import Signin from "pages/Auth";
import Signup from "pages/Signup";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Signin />} />
      <Route index path="/signup" element={<Signup />} />

      <Route element={<PrivateRoute />}>
        <Route element={<PrimaryLayout />}>
          <Route index path="/dashboard" element={<ComingSoon />} />
          <Route index path="/menu" element={<Product />} />

          <Route index path="/analytics" element={<ComingSoon />} />
          <Route index path="/sale" element={<ComingSoon />} />
          <Route index path="/review" element={<ComingSoon />} />
          <Route index path="/chat" element={<ComingSoon />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
