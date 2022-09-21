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
import CreateOrderForm from "../components/order/CreateOrderForm";


const OrderPage = observer(() => {

    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [finalPrice, setFinalPrice] = useState(0)
    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const sendCreateData = async (firstName, lastName, phone, address, comment, buyingType) => {

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
                    <CreateOrderForm
                        validated={validated}
                        errors={errors}
                        finalPrice={finalPrice}
                        sendCreateData={sendCreateData}
                    />
            </Card>
            <Container style={{marginTop: 35, marginBottom: 50}}>
                <OrderProductsRowDesc/>
                {products.map(product => (
                    <OrderProduct key={product.id} cartProduct={product}/>
                ))}
            </Container>
        </div>
    );
});

export default OrderPage;