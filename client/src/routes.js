import React, {useContext} from 'react';
import {Routes, Route, Navigate, Outlet} from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import UpdatePage from "./pages/UpdatePage";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";
import {observer} from "mobx-react-lite";
import {Context} from "./index";

const ProtectedRoute = ({redirectPath = '/login', isAllowed, children}) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath}/>
    }
    return children ? children : <Outlet/>
}

const ShopPagePublic = () => {
    return <ShopPage />
}

const DetailPagePublic = () => {
    return <DetailPage />
}


export const AppRoutes = observer(() => {

    const {user} = useContext(Context)

    return (
        <Routes>

            <Route
                path="product/:id"
                element={<DetailPagePublic/>}
            />

            <Route
                path="/"
                element={<ShopPagePublic/>}
            />

            <Route
                path="login"
            element={
                <ProtectedRoute
                redirectPath='/'
                isAllowed={!user.isAuth}
            >
                <LoginPage/>
            </ProtectedRoute>
                }
            />

            <Route
                path="register"
                element={
                    <ProtectedRoute
                        redirectPath='/'
                        isAllowed={!user.isAuth}
                    >
                        <RegisterPage/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="create"
                element={
                <ProtectedRoute
                    isAllowed={user.isAuth}
                >
                    <CreatePage/>
                </ProtectedRoute>
                    }
            />

            <Route
                path="order"
                element={
                    <ProtectedRoute
                        isAllowed={user.isAuth}
                    >
                        <OrderPage/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="product-update/:id"
                element={
                    <ProtectedRoute
                        isAllowed={user.isAuth}
                    >
                        <UpdatePage/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="cart"
                element={
                    <ProtectedRoute
                        isAllowed={user.isAuth}
                    >
                        <CartPage/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="admin"
                element={
                    <ProtectedRoute
                        redirectPath={'/'}
                        isAllowed={user.isAuth && user.user.role === 'admin' }
                    >
                        <AdminPage/>
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to="login" />} />

        </Routes>
    );
})
