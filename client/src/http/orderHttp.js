import axios from "axios";

export const createOrder = async (orderData) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/order/create-order/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: orderData
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}


export const getOrder = async (orderId) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/order/get-order/${orderId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}


export const getUserOrders = async (userId) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/order/get-user-orders/`,
            params: userId
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}