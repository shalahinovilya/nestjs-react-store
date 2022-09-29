import axios from "axios";
import jwtDecode from "jwt-decode";


export const login = async (authData) => {
    try {
        const res = await axios({
            method: 'post',
            url: `/login/`,
            data: authData
        })
        localStorage.setItem('token', res.data.token)
        return await jwtDecode(res.data.token)
    } catch (e) {
        console.log(e)
        return {err: e.response.data}
    }
}


export const register = async (authData) => {
    try {
        const res = await axios({
            method: 'post',
            url: `/register/`,
            data: authData
        })
        return {token: res.data.token, ...jwtDecode(res.data.token)}
    } catch (e) {
        console.log(e)
        return {err: e.response.data}
    }
}

export const logout = async () => {
    try {
        localStorage.removeItem('token')
    } catch (e) {
        console.log(e)
    }
}

export const updateUser = async (userId, userUpdateData) => {
    try {
        const user = await axios({
            method: 'put',
            url: `/user/update-user/${userId}/`,
            data: userUpdateData,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return user
    } catch (e) {
        console.log(e)
    }
}

export const deleteUser = async (userId) => {
    try {
        const user = await axios({
            method: 'delete',
            url: `/user/delete-user/${userId}/`,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return user
    } catch (e) {
        console.log(e)
    }
}

export const getUserById = async (userId) => {
    try {
        const user = await axios({
            method: 'get',
            url: `/user/get-user/${userId}/`,
        })
        return user
    } catch (e) {
        console.log(e)
    }
}

export const getAllUsers = async () => {

    try {
        const users = await axios({
            method: 'get',
            url: `/user/get-all-users/`,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return users.data
    } catch (e) {
        console.log(e)
    }
}

export const checkAuth = async () => {
    try {
        const res = await axios({
            method: 'get',
            url: `/check/`,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        localStorage.setItem('token', res.data.token)
        return {token: res.data.token, ...jwtDecode(res.data.token)}
    } catch (e) {
        console.log(e)
    }
}