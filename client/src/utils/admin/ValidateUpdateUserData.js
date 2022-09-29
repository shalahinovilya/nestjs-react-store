export const findUpdateUserErrors = async (email, username, role) => {
    const newErrors = {}
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    const availableRoles = ['user', 'admin']

    if (!email.match(emailReg)) {
        newErrors['email'] = 'wrong email address'
    }

    if (username.length < 6 || username.length > 15) {
        newErrors['username'] = 'username must be between 6 and 15 characters'
    }

    if (!availableRoles.includes(role)) {
        newErrors['role'] = 'no such role'
    }

    return newErrors
}
