import {EMAIL_REG} from "../../constants";

export const findRegisterDataError = async (email, username, password) => {
    const newErrors = {}

    if (!email.match(EMAIL_REG)) {
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