import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import {findUpdateOrderErrors} from "../../../utils/admin/ValidateUpdateOrderData";
import {updateOrder} from "../../../http/orderHttp";
import TableDefaultControllers from "../TableDefaultControllers";
import TableEditControllers from "../TableEditControllers";
import {DELIVERY_TYPES} from "../../../constants";


const OrderTr = ({order, showDeleteModal, isEditing, selectIdEditOrder}) => {

    const [firstName, setFirstName] = useState(order.firstName)
    const [lastName, setLastName] = useState(order.lastName)
    const [phone, setPhone] = useState(order.phone)
    const [deliveryType, setDeliveryType] = useState(order.deliveryType)
    const [address, setAddress] = useState(order.address)
    const [errors, setErrors] = useState({})

    const sendUpdateData = async () => {
        const validatedData = await findUpdateOrderErrors(firstName, lastName, phone, deliveryType, address)

        if (Object.keys(validatedData).length) {
            await setErrors(validatedData)
        } else {
            await setErrors(validatedData)
            await updateOrder(order.id, {firstName, lastName, phone, deliveryType, address})
            await selectIdEditOrder(NaN)
        }
    }

    const setDefaultValues = async () => {
        await setFirstName(order.firstName)
        await setLastName(order.lastName)
        await setPhone(order.phone)
        await setDeliveryType(order.deliveryType)
        await setAddress(order.address)
        await setErrors({})
        await selectIdEditOrder(NaN)
    }

    return (
        <tr className="align-middle">
            <td>
                <Form.Group controlId="formBasicOrderId">
                    <Form.Control
                        disabled
                        type="number"
                        placeholder="order id"
                        value={order.id}
                    />

                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formBasicUserId">
                    <Form.Control
                        disabled
                        type="number"
                        placeholder="user id"
                        value={order.userId}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formBasicCartId">
                    <Form.Control
                        disabled
                        type="number"
                        placeholder="cart id"
                        value={order.cartId}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Control
                        disabled={isEditing}
                        type="text"
                        placeholder="first name"
                        minLength={5}
                        maxLength={20}
                        value={firstName}
                        isInvalid={errors.firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                    </Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formBasicLastName">
                    <Form.Control
                        disabled={isEditing}
                        type="text"
                        placeholder="last name"
                        minLength={5}
                        maxLength={20}
                        value={lastName}
                        isInvalid={errors.lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                    </Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formBasicPhone">
                    <Form.Control
                        disabled={isEditing}
                        type="text"
                        placeholder="phone"
                        value={phone}
                        isInvalid={errors.phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
                <Form.Select
                    disabled={isEditing}
                    defaultValue={deliveryType}
                    onChange={e => setDeliveryType(e.target.value)}>
                    {
                        DELIVERY_TYPES.map((type, index)=> {
                            return (<option key={index.toString()} value={type}>{type}</option>)
                        })
                    }
                </Form.Select>
            </td>
            <td>
                <Form.Group controlId="formBasicAddress">
                    <Form.Control
                        disabled={isEditing}
                        type="text"
                        placeholder="address"
                        value={address}
                        isInvalid={errors.address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.address}
                    </Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formBasicCreatedAt">
                    <Form.Control
                        disabled
                        type="date"
                        placeholder="createdAt"
                        value={order.createdAt.split('T')[0]}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlUpdatedAt">
                    <Form.Control
                        disabled
                        type="date"
                        placeholder="updatedAt"
                        value={order.updatedAt.split('T')[0]}
                    />
                </Form.Group>
            </td>

            <div className="admin-order-controllers">
                {isEditing ? (
                   <TableDefaultControllers
                       id={order.id}
                       type={'order'}
                       selectIdEdit={selectIdEditOrder}
                       showDeleteModal={showDeleteModal}
                   />
                ) : (
                    <TableEditControllers
                        setDefaultValues={setDefaultValues}
                        sendUpdateData={sendUpdateData}
                    />
                )}
            </div>
        </tr>
    );
};

export default OrderTr;