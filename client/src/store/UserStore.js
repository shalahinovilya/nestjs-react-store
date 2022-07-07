import {makeAutoObservable} from "mobx";


export class UserStore {

    constructor() {
        this.isAuth = false
        this.user = {}
        makeAutoObservable(this)
    }

    setIsAuth (IsAuth) {
        this.isAuth = IsAuth
    }

    setUser (user) {
        this.user = user
    }

    getIsAuth () {
        return this.isAuth
    }

    getUser () {
        return this.user
    }

}