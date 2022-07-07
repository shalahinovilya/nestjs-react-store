import axios from "axios";

export const getAllCategories = async () => {
    try {
        const res = await axios({
            method: 'get',
            url: `/category/get-all-categories/`,
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}


export const getOneCategory = async (categoryId) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/category/get-category/${categoryId}/`,
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}


export const createCategory = async (categoryData) => {
    try {
        const res = await axios({
            method: 'post',
            url: `/category/create-category/`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: categoryData,
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}