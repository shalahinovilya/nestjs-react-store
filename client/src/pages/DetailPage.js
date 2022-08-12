import React, {useContext, useEffect, useState} from 'react';
import {deleteProduct, getProduct} from "../http/productHttp";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Container, Image, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {addToCart} from "../http/cartHttp";
import {observer} from "mobx-react-lite";
import Comment from "../components/comment/Comment";
import {getAllProductComments} from "../http/commentHttp";
import '../static/DetailPage.css'


const DetailPage = observer(() => {

    const [currentProduct, setCurrentProduct] = useState('')
    const [isCommentLoading, setIsCommentLoading] = useState(false)
    const {user, product} = useContext(Context)

    const productId = useParams().id
    const navigate = useNavigate()

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

    const deleteHandler = async () => {
        await deleteProduct(productId).then(() => navigate('/products/'))
    }

    const addToCartHandler = async () => {
        await addToCart(productId, currentProduct.price, user.getUser().userId)
    }

    return (
        <div className="detail__block">
            <Container className="huba">
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
                        currentProduct.userId === user.getUser().userId &&
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
                                onClick={deleteHandler}
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
    );
});

export default DetailPage;