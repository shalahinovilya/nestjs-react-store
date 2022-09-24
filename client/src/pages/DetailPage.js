import React, {useContext, useEffect, useState} from 'react';
import {getProduct} from "../http/productHttp";
import {Link, useParams} from "react-router-dom";
import {Button, Container, Image, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {addToCart} from "../http/cartHttp";
import {observer} from "mobx-react-lite";
import Comment from "../components/comment/Comment";
import {getAllProductComments} from "../http/commentHttp";
import '../static/DetailPage.css'
import DeleteProductModal from "../components/product/DeleteProductModal";


const DetailPage = observer(() => {

    const [currentProduct, setCurrentProduct] = useState('')
    const [isCommentLoading, setIsCommentLoading] = useState(false)
    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false)
    const {user, product} = useContext(Context)

    const productId = useParams().id

    useEffect(() => {
        getProduct(productId).then(data => {
            setCurrentProduct(data)
        })
    }, [])

    useEffect(() => {
        setIsCommentLoading(true)
        getAllProductComments(productId).then(data => {
            product.setComments(data)
            setIsCommentLoading(false)
        })
    }, [product.commentsNum])

    const closeDeleteProductModalHandler = () => {
        setShowDeleteProductModal(false)
    }

    const openDeleteProductModalHandler = () => {
        setShowDeleteProductModal(true)
    }

    const addToCartHandler = async () => {
        await addToCart(productId, currentProduct.price, user.user.userId)
    }

    return (
        <>
            <DeleteProductModal
                show={showDeleteProductModal}
                closeProductModalHandler={closeDeleteProductModalHandler}
                productId={productId}
            />
        <div className="detail__block detail">
            <Container className="detail__body">
                <div className="detail__row">
                    <div className="detail__column">
                        <div className="detail__item">
                            <div className="detail__img">
                                <Image
                                    width={463}
                                    height={347}
                                    variant="top"
                                    src={process.env.REACT_APP_GET_IMG + '/' + currentProduct.img}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="detail__column">
                        <div className="detail__item__title">
                            <div className="detail__title">
                                {currentProduct.title}
                            </div>
                            <div className="detail__cart__btn">
                                <Button className="detail__add__to__cart" onClick={addToCartHandler}
                                        variant="outline-dark" size="lg">Add to cart</Button>
                            </div>
                        </div>
                    </div>
                    <div className="detail__column">
                        <div className="detail__information">
                            <div className="detail__item">
                                <div className="characteristic__title">
                                    Характеристики и описание
                                </div>
                                <div className="characteristic">
                                    <div className="characteristic__row">
                                        <div className="characteristic__column">
                                            <div className="category__label">
                                                category
                                            </div>
                                            <div className="category__value">
                                                {currentProduct?.category?.value}
                                            </div>
                                        </div>
                                        <div className="characteristic__column">
                                            <div className="price__label">
                                                price
                                            </div>
                                            <div className="price__value">
                                                {currentProduct.price}$
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block__description">
                    <div className="description__title">
                        Description
                    </div>
                    <div className="description__content">
                        {currentProduct.description}
                    </div>
                </div>
                <div className="control-buttons">
                    {
                        currentProduct.userId === user.user.userId &&
                        <div className="card-button-manage">

                            <Link
                                to={`/product-update/${productId}/`}
                                className='btn btn-primary'
                                key={productId}
                                state={currentProduct}
                            >
                                Update
                            </Link>

                            <Button
                                onClick={openDeleteProductModalHandler}
                                className='btn-danger'
                            >
                                Delete
                            </Button>
                        </div>
                    }
                </div>
                {isCommentLoading ? (
                        <div className="loading-comment-block">
                            <Spinner className="loading-spinner" animation="grow" variant="primary"/>
                        </div>
                    )
                    : <Comment productId={productId}/>
                }
            </Container>
        </div>
        </>
    );
});

export default DetailPage;