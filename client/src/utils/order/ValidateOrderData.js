export const findOrderDataErrors = async (firstName, lastName, phone, address, comment, buyingType) => {

    const newErrors = {}
    const validatePhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

    if (firstName.length < 5 || firstName.length > 30) {
        newErrors['firstName'] = 'first name must be between 5 and 30 characters'
    }

    if (lastName.length < 5 || lastName.length > 30) {
        newErrors['lastName'] = 'last name must be between 5 and 30 characters'
    }

    if (!validatePhone.test(phone)) {
        newErrors['phone'] = 'wrong phone number'
    }

    if (address.length < 10 || address.length > 50) {
        newErrors['address'] = 'address must be between 10 and 50 characters'
    }

    if (comment.length > 100) {
        newErrors['comment'] = 'comment must not be more than 100 characters'
    }

    if (!buyingType.length) {
        newErrors['buyingType'] = 'buyingType must not be empty'
    }

    return newErrors

}