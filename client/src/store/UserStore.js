import {makeAutoObservable} from "mobx";


export class UserStore {

    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth (IsAuth) {
        this._isAuth = IsAuth
    }

    setUser (user) {
        this._user = user
    }

    get isAuth () {
        return this._isAuth
    }

    get user () {
        return this._user
    }

}