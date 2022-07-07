import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {getAllCategories} from "../http/CategoryHttp";
import PaginationBasic from "../components/Pagination";

const ProductsPage = observer(() => {

    const {products} = useContext(Context)


    useEffect(() => {
        getAllCategories().then(data => {
            products.setCategories(data)
        })
    }, [])

    return (
        <Container>
            <Row xs={1} md={3} className="g-4">
                {products.getProducts().length && products.getProducts().map((product) => (
                    <Col>
                        <ProductCard product={product}/>
                    </Col>
                )) || <div className="no-products-h1">
                    <h1 style={{fontSize: 100}}>No products</h1>
                </div>
                }
            </Row>
            <PaginationBasic/>
        </Container>
    );
});

export default ProductsPage;