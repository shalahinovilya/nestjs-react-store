import React, {useContext, useEffect, useState} from 'react';
import {Spinner} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import PaginationBasic from "../components/product/Pagination";
import SideBar from "../components/utills/SideBar";
import {getProducts} from "../http/productHttp";
import {getAllCategories} from "../http/categoryHttp";
import CatalogSettings from "../components/utills/CatalogSettings";
import ProductList from "../components/product/ProductList";


const ShopPage = observer(() => {

    const {product} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllCategories().then(data => product.setCategories(data))
        getProducts(3, 0).then(data => {
            product.setProducts(data?.rows)
            product.setTotalRecords(data?.count)
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
        return (
            <div className="loading-block">
                <Spinner className="loading-spinner" animation="grow" variant="primary"/>
            </div>
        )
    }

    return (
        <div className="products-block">
            <div className="products-block__body products-body">
                <div className="products-body__header">
                    <CatalogSettings/>
                </div>
                <div className="products-body__content">
                    <SideBar/>
                    {product.products.length ?  <ProductList/> :
                        (<div className="no-products-block">
                            <h1 className="no-products-h1">No products</h1>
                        </div>)
                    }
                </div>
               <div className="products-body__footer">
                   <PaginationBasic/>
               </div>
            </div>
        </div>
    );
});

export default ShopPage;