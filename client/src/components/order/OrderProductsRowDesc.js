import React from 'react';
import {Col, Row} from "react-bootstrap";

const OrderProductsRowDesc = () => {
    return (
        <div>
            <Row md={6}>
                <Col className="order-img-col">
                    <div>
                        Image
                    </div>
                </Col>
                <Col className="order-title-col">
                    <div>
                        Title
                    </div>
                </Col>
                <Col className="order-price-col">
                    <div>
                        Price
                    </div>
                </Col>
                <Col className="order-category-col">
                    <div>
                        Category
                    </div>
                </Col>
                <Col className="order-quantity-col">
                    <div>
                        Quantity
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default OrderProductsRowDesc;