import React, {useContext} from 'react';
import {Col, Row} from "react-bootstrap";
import ProductCard from "./ProductCard";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ProductList = observer(() => {

    const {product} = useContext(Context)

    return (
        <Row xs={2} md={4} className="g-4">
            {product.products.length && product.products.map((product) => (
                <Col key={product.id} lg={3}>
                    <ProductCard product={product}/>
                </Col>
            ))
            }
        </Row>
    );
});

export default ProductList;