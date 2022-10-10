import React, {useContext, useState} from 'react';
import {Button, Col, Image, Row} from "react-bootstrap";
import {changeCartProductQuantity, deleteFromCart} from "../../http/cartHttp";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const product = observer(({product}) => {

    const {cart} = useContext(Context)
    const [qty, setQty] = useState(product?.cartProduct[0]?.quantity)

    const [increaseBtnDisabled, setIncreaseBtnDisabled] = useState(false)
    const [decreaseBtnDisabled, setDecreaseBtnDisabled] = useState(false)

    const deleteProductFromCart = async () => {
        await deleteFromCart(product.cartProduct[0].id).then(() => cart.setCartTotalProductsCount(0))

    }

    const increaseQty = async () => {
        setIncreaseBtnDisabled(true)
        await changeCartProductQuantity(product.cartProduct[0].id, qty + 1, product.price).then(data => {
            setQty(data.quantity)
            cart.setCartTotalProductsCount(cart.cartTotalProductsCount + 1)
        })
        setIncreaseBtnDisabled(false)
    }

    const decreaseQty = async () => {
        setDecreaseBtnDisabled(true)
        if (qty > 1) await changeCartProductQuantity(product.cartProduct[0].id, qty - 1, product.price)
            .then(data => {
                setQty(data.quantity)
                cart.setCartTotalProductsCount(cart.cartTotalProductsCount - 1)
            })
        setDecreaseBtnDisabled(false)
    }

    return (
        <div className="container">
            <Row style={{marginTop: 20}} md={7}>
                <Col>
                    <div className="cart-img-container">
                        <Image className="cart-img" height={120} width={150}
                               src={process.env.REACT_APP_GET_IMG + '/' + product.img}></Image>
                    </div>
                </Col>
                <Col className="cart-title-col">
                    <p>{product.title}</p>
                </Col>
                <Col className="cart-price-col">
                    <p>{product.price}</p>
                </Col>
                <Col className="cart-category-col">
                    <p>{product?.category?.value}</p>
                </Col>
                <Col className="cart-quantity-col">
                    <p>{qty}</p>
                    <Row>
                        <Col>
                            <Button
                                style={{width: 30}}
                                size="sm"
                                className="btn-success"
                                onClick={increaseQty}
                                disabled={increaseBtnDisabled}
                            >
                                +
                            </Button>
                            <Button
                                style={{width: 30}}
                                size="sm"
                                className="btn-danger"
                                onClick={decreaseQty}
                                disabled={decreaseBtnDisabled}
                            >
                                -
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div>
                <Button onClick={deleteProductFromCart} className="btn-danger delete-from-cart-btn">Delete</Button>
            </div>
            <hr/>
        </div>
    );
});

export default product;