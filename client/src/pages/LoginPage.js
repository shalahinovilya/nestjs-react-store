import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {login} from "../http/userHttp";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";


const LoginPage = observer(() => {

    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async (e) => {
        e.preventDefault()
        const data = await login({email, password})
        const {iat, exp, ...userData} = data
        user.setUser(userData)
        user.setIsAuth(true)

    }

    return (
        <div className="auth-block">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
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
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button
                    className="submit-login-button"
                    variant="outline-success"
                    type="submit"
                    onClick={loginHandler}
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
        </div>
    );
});

export default LoginPage;