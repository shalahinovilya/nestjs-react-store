import React, {useState} from 'react';
import {Form} from "react-bootstrap";

const UserTr = ({user, showDeleteModal}) => {

    const [userId, setUserId] = useState(user.id)
    const [email, setEmail] = useState(user.email)
    const [username, setUsername] = useState(user.username)
    const [role, setRole] = useState(user.role)



    return (
        <tr className="align-middle">
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={true}
                        type="number"
                        placeholder="name@example.com"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={true}
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={true}
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        disabled={true}
                        type="text"
                        placeholder="role"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    />
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
                <div className="edit-item">
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="delete-item">
                    <i
                        className="fa-solid fa-trash"
                        onClick={() => showDeleteModal({userId: user.id, type: 'user'})}
                    >

                    </i>
                </div>
            </div>
        </tr>
    );
};

export default UserTr;