import React from 'react';
import {Col, Row} from "react-bootstrap";

const CartProductsRowDesc = () => {
    return (
        <div>
            <Row md={6}>
                <Col className="cart-table-img">
                    <div>
                        Image
                    </div>
                </Col>
                <Col className="cart-table-title">
                    <div>
                        Title
                    </div>
                </Col>
                <Col className="cart-table-price">
                    <div>
                        Price
                    </div>
                </Col>
                <Col className="cart-table-category">
                    <div>
                        Category
                    </div>
                </Col>
                <Col className="cart-table-quantity">
                    <div>
                        Quantity
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CartProductsRowDesc;