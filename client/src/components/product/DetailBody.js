import React, {useContext} from 'react';
import {Button, Container, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import Comment from "../comment/Comment";
import {addToCart} from "../../http/cartHttp";
import {Context} from "../../index";

const DetailBody = ({currentProduct, openDeleteModalHandler}) => {

    const {user} = useContext(Context)

    const addToCartHandler = async () => {
        await addToCart(currentProduct.id, currentProduct.price, user.user.userId)
    }

    return (
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
                            to={`/product-update/${currentProduct.id}/`}
                            className='btn btn-primary'
                            key={currentProduct.id}
                            state={currentProduct}
                        >
                            Update
                        </Link>

                        <Button
                            onClick={openDeleteModalHandler}
                            className='btn-danger'
                        >
                            Delete
                        </Button>
                    </div>
                }
            </div>
            <Comment productId={currentProduct.id}/>
        </Container>
    );
};

export default DetailBody;