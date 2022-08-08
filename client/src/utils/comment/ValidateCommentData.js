export const findCommentDataErrors = (advantages, limitations, content) => {

    const newErrors = {}

    if (advantages.length < 5 || advantages.length > 20) {
        newErrors['advantages'] = 'advantages must be between 5 and 20 characters'
    }

    if (limitations.length < 5 || limitations.length > 20) {
        newErrors['limitations'] = 'limitations must be between 5 and 20 characters'
    }

    if (content.length < 10 || content.length > 100) {
        newErrors['content'] = 'content must be between 10 and 100 characters'
    }

    return newErrors

}