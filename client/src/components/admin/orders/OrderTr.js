import React, {useState} from 'react';
import {Form} from "react-bootstrap";

const OrderTr = ({order, showDeleteModal}) => {

    const [orderId, setOrderId] = useState(order.id)
    const [userId, setUserId] = useState(order.userId)
    const [cartId, setCartId] = useState(order.cartId)
    const [firstName, setFirstName] = useState(order.firstName)
    const [lastName, setLastName] = useState(order.lastName)
    const [phone, setPhone] = useState(order.phone)
    const [buyingType, setBuyingType] = useState(order.buyingType)
    const [address, setAddress] = useState(order.address)

    return (
        <tr className="align-middle">
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={true}
                        type="number"
                        placeholder="order id"
                        value={orderId}
                        onChange={e => setOrderId(e.target.value)}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={true}
                        type="number"
                        placeholder="user id"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={true}
                        type="number"
                        placeholder="cart id"
                        value={cartId}
                        onChange={e => setCartId(e.target.value)}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={true}
                        type="text"
                        placeholder="first name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={true}
                        type="text"
                        placeholder="last name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={true}
                        type="text"
                        placeholder="phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={true}
                        type="text"
                        placeholder="buying type"
                        value={buyingType}
                        onChange={e => setBuyingType(e.target.value)}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={true}
                        type="text"
                        placeholder="address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled
                        type="date"
                        placeholder="createdAt"
                        value={order.createdAt.split('T')[0]}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled
                        type="date"
                        placeholder="updatedAt"
                        value={order.updatedAt.split('T')[0]}
                    />
                </Form.Group>
            </td>

            <div className="admin-order-controllers">
                <div className="edit-item">
                    <i
                        className="fa-solid fa-pen-to-square"
                        // onClick={() => showDeleteModal(order)}
                    >

                    </i>
                </div>
                <div className="delete-item">
                    <i
                        className="fa-solid fa-trash"
                        onClick={() => showDeleteModal({orderId: order.id, type: 'order'})}
                    >

                    </i>
                </div>
            </div>
        </tr>
    );
};

export default OrderTr;