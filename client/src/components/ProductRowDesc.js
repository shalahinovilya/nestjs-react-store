import React from 'react';
import {Col, Row} from "react-bootstrap";

const ProductRowDesc = () => {
    return (
        <div>
            <Row md={6}>
                <Col>
                    <div className="order-img-row">
                        Image
                    </div>
                </Col>
                <Col>
                    <div className="order-title-row">
                        Title
                    </div>
                </Col>
                <Col>
                    <div className="order-description-row">
                        Description
                    </div>
                </Col>
                <Col>
                    <div className="order-price-row">
                        Price
                    </div>
                </Col>
                <Col>
                    <div className="order-category-row">
                        Category
                    </div>
                </Col>
                <Col>
                    <div className="order-quantity-row">
                        Quantity
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProductRowDesc;