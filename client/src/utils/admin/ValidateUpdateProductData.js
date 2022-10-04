import {VALIDATE_PRICE} from "../../constants";

export const findUpdateProductErrors = async (title, description, price) => {

    const newErrors = {}

    if (title.length < 6 || title.length > 20) {
        newErrors['title'] = 'title must be between 6 and 20 characters'
    }

    if (description.length < 10 || description.length > 200) {
        newErrors['description'] = 'description must be between 10 and 200 characters'
    }

    if (!VALIDATE_PRICE.test(price)) {
        newErrors['price'] = 'must be number value'
    }

    return newErrors
}
