import React, {useContext, useEffect, useState} from 'react';
import {deleteProduct, getProduct} from "../http/productHttp";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Container, Image, Nav, Row} from "react-bootstrap";
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
            <Row md={2} >
                <Col md={{span: 7}}  style={{background: 'gainsboro'}}>
                    <Card style={{ width: '30rem' }}>
                        <Image width={745} height={550} variant="top" src={process.env.REACT_APP_GET_IMG + '/' + product.img}/>
                    </Card>
                </Col>
                <Col md={{span: 4}}>
                    <div className="outer">
                        <div className="middle">
                            <div className="inner">
                                {product.title}<br/>
                                <Button onClick={addToCartHandler} variant="outline-dark" size="lg">Add to cart</Button>
                            </div>
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
                <Col>
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
                <Col>
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