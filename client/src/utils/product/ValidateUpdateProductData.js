import {checkImageSize} from "./ImgValidate";

export const findUpdateProductErrors = async (imgEvent, title, description, price) => {
    const newErrors = {}
    const validatePrice = /\d+(\.\d+)?$/

    let imgValidate

    if (Object.keys(imgEvent).length) {
        imgValidate = await checkImageSize(imgEvent)
    }

    if (imgValidate?.err) {
        newErrors['img'] = imgValidate.err
    }

    if (title.length < 6 || title.length > 20) {
        newErrors['title'] = 'title must be between 6 and 20 characters'
    }

    if (description.length < 10 || description.length > 200) {
        newErrors['description'] = 'description must be between 10 and 200 characters'
    }

    if (!validatePrice.test(price)) {
        newErrors['price'] = 'must be number value'
    }

    return newErrors
}
