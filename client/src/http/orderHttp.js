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
        return {err: e.response.data}
    }
}

export const updateOrder = async (orderId, orderUpdateData) => {
    try {
        const res = await axios({
            method: 'put',
            url: `/order/update-order/${orderId}/`,
            data: orderUpdateData,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        return res
    } catch (e) {
        console.log(e)
        return {err: e.response.data}
    }
}

export const deleteOrder = async (orderId) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `/order/delete-order/${orderId}/`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        return res
    } catch (e) {
        console.log(e)
        return {err: e.response.data}
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
            url: `/order/get-user-orders/${userId}`,
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}


export const getAllOrders = async () => {
    try {
        const res = await axios({
            method: 'get',
            url: `/order/get-all-orders/`,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

