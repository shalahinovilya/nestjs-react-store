import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";

const RegisterForm = ({registerHandler, errors, validated}) => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Form validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email || 'wrong email address'}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    maxLength="15"
                    minLength="6"
                    onChange={e => setUsername(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.username || 'username must be between 6 and 15 characters'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    minLength="6"
                    onChange={e => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.password || 'password must be longer than 6 characters'}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                className="submit-login-button"
                variant="outline-success"
                type="submit"
                href="login"
            >
                Go to Login
            </Button>
            <Button
                className="submit-register-button"
                variant="outline-primary"
                type="submit"
                onClick={(e) => registerHandler(e, email, password, username)}
            >
                Register
            </Button>
        </Form>
    );
};

export default RegisterForm;