import React from 'react';
import {Button, Card, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import OrderProduct from "../components/order/OrderProduct";
import {useEffect} from "react";
import {getAllFromCartByUserId} from "../http/cartHttp";
import {recalcCartFinalPrice} from "../utils/cart/RecalcCartFinalPrice";
import OrderProductsRowDesc from "../components/order/OrderProductsRowDesc";
import {createOrder} from "../http/orderHttp";
import {useNavigate} from "react-router-dom";
import {findOrderDataErrors} from "../utils/order/ValidateOrderData";

const DELIVERY_TYPES = [
    'pickup',
    'courier',
]

const OrderPage = observer(() => {

    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [comment, setComment] = useState('')
    const [buyingType, setBuyingType] = useState(DELIVERY_TYPES[0])
    const [finalPrice, setFinalPrice] = useState(0)
    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const sendCreateData = async () => {

        const validatedData = await findOrderDataErrors(firstName, lastName, phone, address, comment, buyingType)

        if (Object.keys(validatedData).length) {
            setValidated(true)
            setErrors(validatedData)
        }
        else {
            setValidated(false)
            const data = await createOrder({
                firstName,
                lastName,
                phone,
                address,
                comment,
                buyingType,
                userId: user.user.userId
            })

            if (data.err) {
                setValidated(true)
            } else {
                navigate(`/`)
            }
        }
    }

    useEffect(() => {
        getAllFromCartByUserId(user.user.userId).then(data => {
            setFinalPrice(recalcCartFinalPrice(data.rows))
            setProducts(data.rows)
        })
    }, [])

    if (!products.length) return <div className="cart-data-info">your cart is empty</div>

    return (
        <div>
            <Card className="create-product-card" style={{width: '30rem'}}>
                <Form validated={validated}>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <FloatingLabel controlId="floatingFirstName" label="First name">
                            <Form.Control
                                type="text"
                                placeholder="First name"
                                minLength={5}
                                maxLength={20}
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <FloatingLabel controlId="floatingLastName" label="Last name">
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                minLength={5}
                                maxLength={20}
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <FloatingLabel controlId="floatingPhone" label="Phone">
                            <Form.Control
                                type="tel"
                                placeholder="Phone"
                                isInvalid={!!errors.phone}
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <FloatingLabel controlId="floatingAddress" label="Address">
                            <Form.Control
                                type="text"
                                placeholder="Address"
                                minLength={10}
                                maxLength={50}
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.address}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicComment">
                        <FloatingLabel controlId="floatingComment" label="Comment">
                            <Form.Control
                                type="text"
                                placeholder="Comment"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Select aria-label="Default select example" onChange={e => setBuyingType(e.target.value)}>
                        {DELIVERY_TYPES.map((type) => (
                            <option value={type}>{type}</option>
                        ))}
                    </Form.Select>
                    {errors.buyingType && <div className="create__order__error">must not be empty</div>}

                    <Row style={{marginTop: 20}} md={2}>
                        <Col md={{span: 4}}>
                            <Button
                                variant="primary"
                                onClick={sendCreateData}
                            >
                                Create Order
                            </Button>
                        </Col>
                        <Col className="create-order-block-final-price" md={{span: 6}}>
                            <p>Итого: <b>{finalPrice}$</b></p>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <Container style={{marginTop: 35, marginBottom: 50}}>
                <OrderProductsRowDesc/>
                {products.map(product => (
                    <OrderProduct cartProduct={product}/>
                ))}
            </Container>
        </div>
    );
});

export default OrderPage;