import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import {findUpdateUserErrors} from "../../../utils/admin/ValidateUpdateUserData";
import {updateUser} from "../../../http/userHttp";
import TableDefaultControllers from "../TableDefaultControllers";
import TableEditControllers from "../TableEditControllers";


const UserTr = ({user, showDeleteModal, isEditing, selectIdEditUser}) => {

    const [email, setEmail] = useState(user.email)
    const [username, setUsername] = useState(user.username)
    const [role, setRole] = useState(user.role)
    const [errors, setErrors] = useState({})

    const sendUpdateData = async () => {
        const validatedData = await findUpdateUserErrors(email, username, role)

        if (Object.keys(validatedData).length) {
            await setErrors(validatedData)
        } else {
            await setErrors(validatedData)
            await updateUser(user.id, {email, username, role})
            await selectIdEditUser(NaN)
        }
    }

    const setDefaultValues = async () => {
        await setEmail(user.email)
        await setUsername(user.username)
        await setRole(user.role)
        await setErrors({})
        await selectIdEditUser(NaN)
    }

    return (
        <tr className="align-middle">
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled
                        type="number"
                        placeholder="name@example.com"
                        value={user.id}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={isEditing}
                        type="email"
                        placeholder="email"
                        value={email}
                        isInvalid={errors.email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={isEditing}
                        type="text"
                        placeholder="username"
                        value={username}
                        isInvalid={errors.username}
                        onChange={e => setUsername(e.target.value)}
                    />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={isEditing}
                        type="text"
                        placeholder="role"
                        value={role}
                        isInvalid={errors.role}
                        onChange={e => setRole(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.role}
                    </Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled
                        type="date"
                        placeholder="createdAt"
                        value={user.createdAt.split('T')[0]}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled
                        type="date"
                        placeholder="updatedAt"
                        value={user.updatedAt.split('T')[0]}
                    />
                </Form.Group>
            </td>
            <div className="admin-user-controllers">
                {isEditing ? (
                    <TableDefaultControllers
                        id={user.id}
                        type={'user'}
                        selectIdEdit={selectIdEditUser}
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

export default UserTr;