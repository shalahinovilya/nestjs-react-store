import {AVAILABLE_ROLES, EMAIL_REG} from "../../constants";

export const findUpdateUserErrors = async (email, username, role) => {
    const newErrors = {}

    if (!email.match(EMAIL_REG)) {
        newErrors['email'] = 'wrong email address'
    }

    if (username.length < 6 || username.length > 15) {
        newErrors['username'] = 'username must be between 6 and 15 characters'
    }

    if (!AVAILABLE_ROLES.includes(role)) {
        newErrors['role'] = 'no such role'
    }

    return newErrors
}
