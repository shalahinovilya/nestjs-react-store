export const findRegisterDataError = async (email, username, password) => {
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