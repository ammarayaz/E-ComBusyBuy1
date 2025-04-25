import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import {useAuth} from "../../context/Auth/AuthContext"

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
