import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {DELIVERY_TYPES} from "../../constants";


const CreateOrderForm = ({validated, errors, finalPrice, sendCreateData}) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [comment, setComment] = useState('')
    const [deliveryType, setDeliveryType] = useState(DELIVERY_TYPES[0])

    return (
        <Form validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicComment">
                <Form.Label>Comment</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Comment"
                        maxLength="100"
                        as="textarea"
                        rows={4}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                <Form.Control.Feedback type="invalid">
                    {errors.comment}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Select aria-label="Select Delivery Type" onChange={e => setDeliveryType(e.target.value)}>
                <Form.Label>Delivery Type</Form.Label>
                {DELIVERY_TYPES.map((type, index) => (
                    <option key={index.toString()} value={type}>{type}</option>
                ))}
            </Form.Select>
            {errors.deliveryType && <div className="create__order__error">must not be empty</div>}

            <Row style={{marginTop: 20}} md={2}>
                <Col md={{span: 4}}>
                    <Button
                        variant="primary"
                        onClick={() => sendCreateData(firstName, lastName, phone, address, comment, deliveryType)}
                    >
                        Create Order
                    </Button>
                </Col>
                <Col className="create-order-block-final-price" md={{span: 6}}>
                    <p>Итого: <b>{finalPrice}$</b></p>
                </Col>
            </Row>
        </Form>
    );
};

export default CreateOrderForm;