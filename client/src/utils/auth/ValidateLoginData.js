export const findLoginDataError = async (email, password) => {
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