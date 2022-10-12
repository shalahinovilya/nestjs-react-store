import axios from "axios";


export const createProduct = async (productCreateData) => {

    try {
        const res = await axios({
            method: 'post',
            url: '/product/create-product/',
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: productCreateData
            })
        return res.data
    } catch (e) {
        console.log(e)
        return {err: e.response.data}
    }
}

export const updateProduct = async (productId, productUpdateData) => {
    try {
        const res = await axios({
            method: 'put',
            url: `/product/update-product/${productId}/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: productUpdateData
        })
        return res.data
    } catch (e) {
        console.log(e)
        return {err: e.response.data}
    }
}

export const deleteProduct = async (productId) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `/product/delete-product/${productId}/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getProduct = async (productId) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/product/get-product/${productId}/`,
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getProducts = async (limit, offset, categoryId, searchInput, sortOrder) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/product/get-products/`,
            params: {limit, offset, categoryId, searchInput, sortOrder}
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getProductsForCart = async (idList, cartId) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/product/get-products-for-cart/`,
            params: {idList, cartId}
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getProductsForAdmin = async () => {
    try {
        const res = await axios({
            method: 'get',
            url: `/product/get-products-for-admin/`,
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}