import axios from "axios";

export const getAllFromCartByUserId = async (userId) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/cart/get-all-from-cart/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {userId}
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}


export const addToCart = async (productId, finalPrice, userId) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/cart/add-to-cart/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {productId, finalPrice, userId}
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const deleteFromCart = async (cartProductId) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/cart/delete-from-cart/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {cartProductId}
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const changeCartProductQuantity = async (cartProductId, quantity, productPrice) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/cart/change-cart-product-qty/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {cartProductId, quantity, productPrice}
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const changeCartFinalPrice = async (userId, finalPrice) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/cart/change-cart-final-price/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {userId, finalPrice}
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}