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
    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const findErrors = async () => {
        const newErrors = {}
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g

        if (!email.match(emailReg)) {
            newErrors['email'] = 'wrong email address'
        }

        if (password.length < 6) {
            newErrors['password'] = 'password must be longer than 6 characters'
        }

        return newErrors
    }

    const loginHandler = async (e) => {
        e.preventDefault()

        const validateData = await findErrors()

        if (Object.keys(validateData).length) {
            setValidated(true)
            setErrors(validateData)
        }
        else {
            setValidated(false)
            const data = await login({email, password})

            if (data['err']) {
                setErrors({...errors, message: data['err'].message})
            }
            else {
                const {iat, exp, ...userData} = data
                user.setUser(userData)
                user.setIsAuth(true)
            }

        }
    }

    return (
        <div className="auth-block">
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
                {errors.message && (<div className="wrong___login__data">{errors.message}</div>)}
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