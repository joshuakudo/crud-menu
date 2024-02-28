import { Navigate, Outlet, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

import { isAuthenticated } from "../../redux/product/selector";
import { useSelector } from "react-redux";

const PrivateRoute: React.FC<{}> = () => {
  const location = useLocation();
  const auth = useSelector(isAuthenticated);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  if (auth) {
    return <Outlet />;
  }

  return <Navigate to="/"></Navigate>;
};

export default PrivateRoute;