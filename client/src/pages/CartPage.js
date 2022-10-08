import React, {useContext, useEffect, useState} from 'react';
import {Container, Row, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {changeCartFinalPrice, getAllFromCartByUserId} from "../http/cartHttp";
import {getProductsForCart} from "../http/productHttp";
import CartProduct from "../components/cart/CartProduct";
import CartProductsRowDesc from "../components/cart/CartProductsRowDesc";
import {recalcCartFinalPrice} from "../utils/cart/RecalcCartFinalPrice";
import {countTotalProducts} from "../utils/product/CountTotalProducts";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";

const CartPage = observer(() => {

    const {user, cart} = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        setIsLoading(true)

        getAllFromCartByUserId(user.user.userId).then(async data => {

            await cart.setCartTotalProductsCount(countTotalProducts(data.rows))

            await getProductsForCart(data.rows.reduce(
                (res, row) => [...res, row.productId], []), data?.rows[0]?.cartId).then(data => cart.setCartProducts(data))

            await cart.setFinalPrice(recalcCartFinalPrice(data.rows))

            await changeCartFinalPrice(user.user.userId, cart.finalPrice)

        }).finally(() => setIsLoading(false))
    }, [cart.cartTotalProductsCount])

    if (isLoading) {
        return (
            <div className="loading-block">
                <Spinner className="loading-spinner" animation="grow" variant="primary"/>
            </div>
        )
    }

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
                            key={product.id}
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