import React, { useEffect, useContext } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";

import { Routes, Route } from "react-router-dom";

//Pages
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CartPage from "./pages/CartPage/CartPage";
import OrderPage from "./pages/OrdersPage/OrdersPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import { AuthProvider } from "./context/Auth/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { ProductProvider } from "./context/Products/ProductContext";

function App() {
  return (
    <ProductProvider>
      <div className="App">
        {/* Define your ContextProvider */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/myorders"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ProductProvider>
  );
}

export default App;
