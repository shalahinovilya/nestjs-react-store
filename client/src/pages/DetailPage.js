import React, {useContext, useEffect, useState} from 'react';
import {getProduct} from "../http/productHttp";
import {useParams} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {getAllProductComments} from "../http/commentHttp";
import '../static/DetailPage.css'
import DeleteProductModal from "../components/product/DeleteProductModal";
import DetailBody from "../components/product/DetailBody";


const DetailPage = observer(() => {

    const {product} = useContext(Context)
    const productId = useParams().id

    const [currentProduct, setCurrentProduct] = useState('')
    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getProduct(productId).then(data => {
            setCurrentProduct(data)
        })
    }, [])

    useEffect(() => {
        getAllProductComments(productId).then(data => {
            product.setComments(data)
        }).finally(() => setIsLoading(false))
    }, [product.commentsNum])

    const closeDeleteProductModalHandler = () => {
        setShowDeleteProductModal(false)
    }

    const openDeleteProductModalHandler = () => {
        setShowDeleteProductModal(true)
    }

    if (isLoading) {
        return ( <div className="loading-block">
            <Spinner className="loading-spinner" animation="grow" variant="primary"/>
        </div>)
    }

    return (
        <>
            <DeleteProductModal
                show={showDeleteProductModal}
                closeProductModalHandler={closeDeleteProductModalHandler}
                productId={productId}
            />
        <div className="detail__block detail">
            <DetailBody
                currentProduct={currentProduct}
                openDeleteModalHandler={openDeleteProductModalHandler}
            />
        </div>
        </>
    );
});

export default DetailPage;