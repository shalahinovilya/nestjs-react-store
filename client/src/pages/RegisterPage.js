import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {register} from "../http/userHttp";
import {useNavigate} from "react-router-dom";


const RegisterPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const findErrors = async () => {
        const newErrors = {}
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g

        if (!email.match(emailReg)) {
            newErrors['email'] = 'wrong email address'
        }

        if (username.length < 6 || username.length > 15) {
            newErrors['username'] = 'username must be between 6 and 15 characters'
        }

        if (password.length < 6) {
            newErrors['password'] = 'password must be longer than 6 characters'
        }

        return newErrors
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        const validateData = await findErrors()
        if (Object.keys(validateData).length) {
            setValidated(true)
            setErrors(validateData)
        }
        else {
            const res = register({email, username, password})
            navigate('/login/')
        }
    }

    return (
        <div>
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
                            {errors.username}
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
                            {errors.password}
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