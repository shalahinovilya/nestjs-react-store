import React, {useEffect, useState} from 'react';
import {Button, Col, Image, Row} from "react-bootstrap";
import {getProduct} from "../http/productHttp";
import {changeCartProductQuantity, deleteFromCart} from "../http/cartHttp";
import {observer} from "mobx-react-lite";

const ProductCart = observer(({cartProduct, counterHandler, increaseTotalProducts, decreaseTotalProducts}) => {

    const [product, setProduct] = useState({})
    const [qty, setQty] = useState(cartProduct.quantity)

    useEffect(() => {
        getProduct(cartProduct.productId).then(data => {
            setProduct(data)
        })
    }, [])

    const deleteProductFromCart = async () => {
        await deleteFromCart(cartProduct.id)
        await counterHandler()
    }

    const increaseQty = async () => {
        await changeCartProductQuantity(cartProduct.id, qty + 1, product.price).then(data => {
            setQty(data.quantity)
            increaseTotalProducts()
        })
    }

    const decreaseQty = async () => {
        if (qty > 1) await changeCartProductQuantity(cartProduct.id, qty - 1, product.price)
            .then(data => {
                setQty(data.quantity)
                decreaseTotalProducts()
            })
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
                <Col className="cart-description-col">
                    <p>{product.description}</p>
                </Col>
                <Col className="cart-price-col">
                    <p>{product.price}</p>
                </Col>
                <Col className="cart-category-col">
                    <p>category</p>
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
                            >
                                +
                            </Button>
                            <Button
                                style={{width: 30}}
                                size="sm"
                                className="btn-danger"
                                onClick={decreaseQty}
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

export default ProductCart;