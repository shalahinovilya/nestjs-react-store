export const findUpdateOrderErrors = async (firstName, lastName, phone, buyingType, address) => {

    const newErrors = {}
    const validatePhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
    const availableBuyingTypes = ['pickup', 'courier']

    if (firstName.length < 5 || firstName.length > 20) {
        newErrors['firstName'] = 'first name must be between 5 and 20 characters'
    }

    if (lastName.length < 5 || lastName.length > 20) {
        newErrors['lastName'] = 'last name must be between 5 and 20 characters'
    }

    if (!validatePhone.test(phone)) {
        newErrors['phone'] = 'wrong phone number'
    }

    if (address.length < 10 || address.length > 50) {
        newErrors['address'] = 'address must be between 10 and 50 characters'
    }

    if (!availableBuyingTypes.includes(buyingType)) {
        newErrors['buyingType'] = 'wrong buying type'
    }

    return newErrors
}
