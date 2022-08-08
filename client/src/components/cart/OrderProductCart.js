import React from 'react';
import {Col, Image, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getProduct} from "../../http/productHttp";

const OrderProductCart = ({cartProduct}) => {

    const [product, setProduct] = useState({})

    useEffect(() => {
        getProduct(cartProduct.productId).then(data => setProduct(data))
    }, [])

    return (
        <div>
            <Row style={{marginTop: 20}} md={6}>
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
                    <p>{cartProduct.quantity}</p>
                </Col>
            </Row>
        </div>
    );
};

export default OrderProductCart;