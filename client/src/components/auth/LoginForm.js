import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";

const LoginForm = ({loginHandler, errors, validated}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Form validated={validated}>
            {errors.message && (<div className="wrong___login__data">{errors.message}</div>)}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    minLength="6"
                    onChange={e => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>
            <Button
                className="submit-login-button"
                variant="outline-success"
                type="submit"
                onClick={(e) => loginHandler(e, email, password)}
            >
                Login
            </Button>
            <Button
                className="submit-register-button"
                variant="outline-primary"
                href="register"
            >
                I'm not registered
            </Button>
        </Form>
    );
};

export default LoginForm;