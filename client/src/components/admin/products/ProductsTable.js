import React, {useContext, useEffect, useState} from 'react';
import TableLoader from "../TableLoader";
import ProductsList from "./ProductsList";
import {Table} from "react-bootstrap";
import {getProductsForAdmin} from "../../../http/productHttp";
import {Context} from "../../../index";
import ProductsBlockHeader from "./ProductsBlockHeader";


const ProductsTable = () => {

    const {admin} = useContext(Context)

    const [isLoading, setIsLoading] = useState(false)

    const getProducts = async () => {
        await setIsLoading(true)
        await getProductsForAdmin()
            .then(data => admin.setProducts(data))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getProducts()
    }, [admin.products.length]
    )

    if (!admin.products.length) {
        return <div>No Data</div>
    }

    return (
        <>
            {isLoading ? (<TableLoader/>) : (
                <Table striped bordered hover size="sm">
                    <ProductsBlockHeader/>
                    <tbody>
                    <ProductsList/>
                    </tbody>
                </Table>
            )}
        </>
    )
};

export default ProductsTable;