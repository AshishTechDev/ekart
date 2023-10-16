import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./shop/pages/Home";
import Cart from "./shop/pages/Cart";
import ProductsList from "./shop/pages/ProductsList";
import ProductDetail from "./shop/pages/ProductDetail";

import EditProduct from "./admin/pages/EditProduct";
import Products from "./admin/pages/Products";

import Login from "./Auth/pages/Login";
import Signup from "./Auth/pages/Signup";
import ResetPassword from "./Auth/pages/ResetPassword";
import SetPassword from "./Auth/pages/SetPassword";
import Error404 from "./Error404";
import AuthContext from "./context/Auth-Context";
import ProtectedRoute from "./util/ProtectedRoute";

import { useState } from "react";
import { useCallback } from "react";

export default function App() {
  const ctx = useContext(AuthContext);
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = useCallback((token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsLoggedIn(true);
  },[]);

  const logoutHandler = useCallback(()=> {
    localStorage.removeItem("token");
    setToken("");
    setIsLoggedIn(false);
  },[]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn,
        loginHandler,
        logoutHandler,
      }} 
    >
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product/:productID" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/set-password" element={<SetPassword />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        {ctx.role === "admin" && (
          <>
            <Route
              path="/admin/addProduct"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
          </>
        )}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
      </AuthContext.Provider>
  );
}
