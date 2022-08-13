import React from 'react';
import {Col, Image, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getProduct} from "../../http/productHttp";

const OrderProduct = ({cartProduct}) => {

    const [product, setProduct] = useState({})

    useEffect(() => {
        getProduct(cartProduct.productId).then(data => {
            setProduct(data)
        })
    }, [])

    return (
        <div>
            <Row style={{marginTop: 20}} md={6}>
                <Col>
                    <div className="cart-img-container">
                        <Image className="cart-img" height={110} width={110}
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
                    <p>{cartProduct.quantity}</p>
                </Col>
            </Row>
        </div>
    );
};

export default OrderProduct;