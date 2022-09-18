import React, {useState} from 'react';
import {register} from "../http/userHttp";
import {useNavigate} from "react-router-dom";
import {findRegisterDataError} from "../utils/auth/ValidateRegisterData";
import RegisterForm from "../components/auth/RegisterForm";


const RegisterPage = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const registerHandler = async (e, email, password, username) => {

        e.preventDefault()

        const validateData = await findRegisterDataError(email, username, password)

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
        <>
            <div className="auth-block">
               <RegisterForm
                   registerHandler={registerHandler}
                   errors={errors}
                   validated={validated}
               />
            </div>
        </>
    );
};

export default RegisterPage;