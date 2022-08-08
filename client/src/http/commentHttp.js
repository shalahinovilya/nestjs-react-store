import axios from "axios";


export const createComment = async (commentData) => {
    try {
        const res = await axios({
            method: 'post',
            url: `/comment/create-comment/`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: commentData
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const updateComment = async (commentId, commentData) => {
    try {
        const res = await axios({
            method: 'put',
            url: `/comment/update-comment/${commentId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: commentData
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const deleteComment = async (commentId) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `/comment/delete-comment/${commentId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getAllProductComments = async (productId) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/comment/get-product-comments/${productId}`,
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getAllUserComments = async (userId) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/comment/get-user-comments/${userId}`,
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}