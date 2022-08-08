import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import ProductCard from "../components/product/ProductCard";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import PaginationBasic from "../components/product/Pagination";
import SideBar from "../components/utills/SideBar";
import {getProducts} from "../http/productHttp";
import {getAllCategories} from "../http/categoryHttp";
import CatalogSettings from "../components/utills/CatalogSettings";


const ProductsPage = observer(() => {

    const {product} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllCategories().then(data => product.setCategories(data))
        getProducts(3, 0).then(data => {
            product.setProducts(data.rows)
            product.setTotalRecords(data.count)
        })
    }, [])

    useEffect(() => {
        getProducts(product.limit, product.offset, product.selectedCategory.id, product.sortOrderVars[product.selectedSortOrder])
            .then(data => {
                product.setProducts(data.rows)
                product.setTotalRecords(data.count)
                setLoading(false)
            })
    }, [product.page, product.selectedCategory, product.selectedSortOrder])

    if (loading) {
        return (<div className="loading-block">
            <Spinner className="loading-spinner" animation="grow" variant="primary"/>
        </div>)
    }

    if (!product.products.length) {
        return (<div>
                <CatalogSettings/>
                <SideBar/>
                <div className="no-products-block">
                    <h1 className="no-products-h1">No products</h1>
                </div>
            </div>
        )
    }

    return (
        <div>
            <CatalogSettings/>
            <SideBar/>
            <Container>
                <Row xs={2} md={4} className="g-4">
                    {product.products.length && product.products.map((product) => (
                        <Col lg={4}>
                            <ProductCard product={product}/>
                        </Col>
                    ))
                    }
                </Row>
                <PaginationBasic/>
            </Container>
        </div>
    );
});

export default ProductsPage;