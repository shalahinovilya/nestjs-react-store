import React, {useContext, useEffect} from 'react';
import {Container, Row} from "react-bootstrap";
import {Context} from "../index";
import {changeCartFinalPrice, deleteFromCart, getAllFromCartByUserId} from "../http/cartHttp";
import CartProduct from "../components/cart/CartProduct";
import {recalcCartFinalPrice} from "../utils/cart/RecalcCartFinalPrice";
import {countTotalProducts} from "../utils/product/CountTotalProducts";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import CartProductsRowDesc from "../components/cart/CartProductsRowDesc";
import {getProductsForCart} from "../http/productHttp";

const CartPage = observer(() => {

    const {user, cart} = useContext(Context)

    useEffect(() => {
        getAllFromCartByUserId(user.user.userId).then(data => {
            cart.setCartTotalProductsCount(countTotalProducts(data.rows))
            getProductsForCart(data.rows.reduce(
                (res, row) => [...res, row.productId], [])).then(data => cart.setCartProducts(data))
            cart.setFinalPrice(recalcCartFinalPrice(data.rows))
            changeCartFinalPrice(user.user.userId, cart.finalPrice)
        })
    }, [cart.cartTotalProductsCount])

    if (!cart?.cartProducts?.length) {
        return <div className="cart-data-info">Your cart is empty</div>
    }

    return (
        <div>
            <Container>
                <CartProductsRowDesc/>
                <Row md={1}>
                    {cart.cartProducts.map((product) => (
                        <CartProduct
                            product={product}
                        />
                    ))}
                </Row>
                <div className="final-price-content">In total: <br/><strong>{cart.finalPrice}$</strong></div>
                <Link
                    to="/order/"
                    className="btn btn-outline-secondary go-to-order-btn"
                >
                    Make an order
                </Link>
            </Container>
        </div>
    );
});

export default CartPage;