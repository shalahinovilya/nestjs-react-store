import React, {useContext, useEffect, useState} from 'react';
import {deleteProduct, getProduct} from "../http/productHttp";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Col, Container, Image, Nav, Row} from "react-bootstrap";
import {Context} from "../index";
import {getOneCategory} from "../http/CategoryHttp";
import {addToCart} from "../http/cartHttp";
import {observer} from "mobx-react-lite";

const DetailPage = observer(() => {

    const [product, setProduct] = useState('')
    const [category, setCategory] = useState('')
    const {user} = useContext(Context)

    const productId = useParams().id
    const navigate = useNavigate()

    useEffect(() => {
        getProduct(productId).then(data => {
            setProduct(data)
            getOneCategory(data.categoryId).then(data => setCategory(data))
        })

    }, [getProduct])

    const deleteHandler = async () => {
        await deleteProduct(productId).then(() => navigate('/products/'))
    }

    const addToCartHandler = async () => {
        await addToCart(productId, product.price, user.getUser().userId)
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
                                    src={process.env.REACT_APP_GET_IMG + '/' + product.img}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="detail__column">
                        <div className="detail__item__title">
                            <div className="detail__title">
                                {product.title}
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
                                        </div>
                                        <div className="characteristic__column">
                                            <div className="category__value">
                                                {category.value}
                                            </div>
                                        </div>
                                        <div className="characteristic__column">
                                            <div className="price__label">
                                                price
                                            </div>
                                        </div>
                                        <div className="characteristic_column">
                                            <div className="price__value">
                                                {product.price}$
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
                        {product.description}
                    </div>
                </div>
                <div className="control-buttons">
                    {
                        product.userId === user.getUser().userId &&
                        <div className="card-button-manage">

                            <Link
                                to={`/product-update/${productId}/`}
                                className='btn btn-primary'
                                key={productId}
                                state={product}
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
            </Container>
        </div>
    );
});

export default DetailPage;