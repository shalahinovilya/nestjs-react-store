import {EMAIL_REG} from "../../constants";

export const findLoginDataError = async (email, password) => {
    const newErrors = {}

    if (!email.match(EMAIL_REG)) {
        newErrors['email'] = 'wrong email address'
    }

    if (password.length < 6) {
        newErrors['password'] = 'password must be longer than 6 characters'
    }

    return newErrors
}