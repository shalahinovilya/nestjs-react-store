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
        <Container style={{marginTop: 50}}>
            <Row md={2}>
                <Col md={{span: 5}}>
                    <div>
                        <Image width={400} height={440} variant="top"
                               src={process.env.REACT_APP_GET_IMG + '/' + product.img}/>
                    </div>
                </Col>
                <Col md={{span: 4}}>
                    <div className="title-box">
                        <div>
                            <strong>{product.title}</strong>
                        </div>
                        <div>
                            <Button onClick={addToCartHandler} variant="outline-dark" size="lg">Add to cart</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row md={2}>
                <Col>
                    <div className="characteristic-desc">
                        Характеристики и описание
                    </div>
                </Col>
            </Row>
            <Row md={2}>
                <Col md={{span: 2}}>
                    <div className="category">
                        Категория
                    </div>
                </Col>
                <Col md={{span: 6}}>
                    <div className="category-content">
                        {category.value}
                    </div>

                </Col>
            </Row>
            <Row md={2}>
                <Col md={{span: 2}}>
                    <div className="price">
                        Цена
                    </div>
                </Col>
                <Col md={{span: 6}}>
                    <div className="price-content">
                        {product.price}$
                    </div>
                </Col>
            </Row>
            <div className="description-content">
                {product.description}
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
    );
});

export default DetailPage;