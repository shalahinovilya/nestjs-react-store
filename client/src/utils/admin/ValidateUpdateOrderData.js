import {DELIVERY_TYPES, PHONE_REG} from "../../constants";

export const findUpdateOrderErrors = async (firstName, lastName, phone, buyingType, address) => {

    const newErrors = {}

    if (firstName.length < 5 || firstName.length > 20) {
        newErrors['firstName'] = 'first name must be between 5 and 20 characters'
    }

    if (lastName.length < 5 || lastName.length > 20) {
        newErrors['lastName'] = 'last name must be between 5 and 20 characters'
    }

    if (!PHONE_REG.test(phone)) {
        newErrors['phone'] = 'wrong phone number'
    }

    if (address.length < 10 || address.length > 50) {
        newErrors['address'] = 'address must be between 10 and 50 characters'
    }

    if (!DELIVERY_TYPES.includes(buyingType)) {
        newErrors['buyingType'] = 'wrong buying type'
    }

    return newErrors
}
