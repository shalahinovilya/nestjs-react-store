import React, {useContext, useEffect, useState} from 'react';
import {Spinner} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import PaginationBasic from "../components/product/Pagination";
import SideBar from "../components/utills/SideBar";
import CatalogSettings from "../components/utills/CatalogSettings";
import ProductList from "../components/product/ProductList";
import {getProducts} from "../http/productHttp";
import {getAllCategories} from "../http/categoryHttp";
import {findMinMaxPrice} from "../utils/product/findMinMaxPrice";

const ShopPage = observer(() => {

    const {product} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllCategories().then(data => product.setCategories(data))
        getProducts(
            product.limit,
            product.offset,
            null,
            product.searchInput,
            product.selectedPricing,
            product.sortOrderVars[product.selectedSortOrder])
            .then(async data => {
            await product.setProducts(data?.rows)
            await product.setTotalRecords(data?.count)
            await product.setSelectedPricing(await findMinMaxPrice(data.rows))
        })
    }, [])

    useEffect(() => {
        setLoading(true)
        getProducts(
            product.limit,
            product.offset,
            product.selectedCategory.id,
            product.searchInput,
            product.selectedPricing,
            product.sortOrderVars[product.selectedSortOrder])
            .then(async data => {
                await product.setProducts(data.rows)
                await product.setTotalRecords(data.count)
                await setLoading(false)
            })
    }, [
        product.page,
        product.selectedCategory,
        product.selectedSortOrder,
        JSON.stringify(product.selectedPricing),
        product.searchInput])

    if (loading) {
        return (
            <div className="loading-block">
                <Spinner className="loading-spinner" animation="border" variant="primary"/>
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
                    {product?.products?.length ?  <ProductList/> :
                        (<div className="no-products-block">
                            <h1 className="no-products-h1">No products</h1>
                        </div>)
                    }
                </div>
                {product?.products?.length && (
                    <div className="products-body__pagination">
                        <PaginationBasic/>
                    </div>
                )}
            </div>
        </div>
    );
});

export default ShopPage;