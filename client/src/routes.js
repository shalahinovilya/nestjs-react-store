import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import UpdatePage from "./pages/UpdatePage";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";

export const UnAuthRoutes = () => {
    return (
        <Routes>

            <Route
                path="product/:id"
                element={<DetailPage/>}
            />

            <Route
                path="products"
                element={<ProductsPage/>}
            />

            <Route
                path="login"
                element={<LoginPage/>}
            />

            <Route
                path="register"
                element={<RegisterPage/>}
            />

            <Route path="*" element={<Navigate to="login" />} />

        </Routes>
    );
}

export const AuthRoutes = () => {

    return (

        <Routes>

            <Route
                path="create"
                element={<CreatePage/>}
            />

            <Route
                path="order"
                element={<OrderPage/>}
            />

            <Route
                path="product-update/:id"
                element={<UpdatePage/>}
            />

            <Route
                path="product/:id"
                element={<DetailPage/>}
            />

            <Route
                path="cart"
                element={<CartPage/>}
            />

            <Route
                path="products"
                element={<ProductsPage/>}
            />

            <Route
                path="admin"
                element={<AdminPage/>}
            />

            <Route path="*" element={<Navigate to="create" />} />

        </Routes>
    );
};

