import React, {useState} from 'react';
import {login} from "../http/userHttp";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import {findLoginDataError} from "../utils/auth/ValidateLoginData";
import LoginForm from "../components/auth/LoginForm";


const LoginPage = observer(() => {

    const {user} = useContext(Context)

    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const loginHandler = async (e, email, password) => {
        e.preventDefault()

        const validateData = await findLoginDataError(email, password)

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
           <LoginForm loginHandler={loginHandler} errors={errors} validated={validated} />
        </div>
    );
});

export default LoginPage;