import React, {useContext, useEffect} from 'react';
import {Container, Row} from "react-bootstrap";
import {Context} from "../index";
import {changeCartFinalPrice, getAllFromCartByUserId} from "../http/cartHttp";
import ProductCart from "../components/ProductCart";
import {recalcCartFinalPrice} from "../utils/RecalcCartFinalPrice";
import {countTotalProducts} from "../utils/countTotalProducts";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import ProductRowDesc from "../components/ProductRowDesc";

const CartPage = observer(() => {

    const {user, cart} = useContext(Context)

    const counterHandler = async () => {
        cart.setCartDataCount(cart.cartDataCount - 1)
    }

    const increaseTotalProducts = async () => {
        cart.setCartTotalProductsCount(cart.getCartTotalProductsCount() + 1)
    }

    const decreaseTotalProducts = async () => {
        cart.setCartTotalProductsCount(cart.getCartTotalProductsCount() - 1)
    }

    useEffect(() => {
        getAllFromCartByUserId(user.getUser().userId).then(data => {
            cart.setCartTotalProductsCount(countTotalProducts(data.rows))
            cart.setCartDataCount(data.count)
            cart.setCartProducts(data.rows)
        })
    }, [cart.cartDataCount])

    useEffect(() => {
        getAllFromCartByUserId(user.getUser().userId).then(data => {
            cart.setFinalPrice(recalcCartFinalPrice(data.rows))
            changeCartFinalPrice(user.getUser().userId, cart.getFinalPrice())
        })
    }, [cart.getCartTotalProductsCount()])


    if (!cart.getCartProducts().length) {
        return <div className="cart-data-info">no data in cart</div>
    }


    return (
        <div>
            <Container>
                <ProductRowDesc/>
                <Row md={1}>
                {cart.getCartProducts().map(product => (
                            <ProductCart
                                increaseTotalProducts={increaseTotalProducts}
                                decreaseTotalProducts={decreaseTotalProducts}
                                counterHandler={counterHandler}
                                cartProduct={product}
                            />
                ))}
                </Row>
                <Link
                    to="/order/"
                    className="btn go-to-order-btn"
                >
                    Make an order<br/>
                    <div className="final-price-content">{cart.getFinalPrice()}$</div>
                </Link>
            </Container>
        </div>
    );
});

export default CartPage;