import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {register} from "../http/userHttp";
import {useNavigate} from "react-router-dom";


const RegisterPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const registerHandler = async (e) => {
        e.preventDefault()
        await register({email, username, password})
        navigate('/login/')
    }

    return (
        <div>
            <div className="auth-block">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
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
                        onClick={registerHandler}
                    >
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default RegisterPage;