import {makeAutoObservable} from "mobx";


export class AdminStore {

    constructor() {
        this._orders = []
        this._users = []
        makeAutoObservable(this)
    }

    setOrders (orders) {
        this._orders = orders
    }

    setUsers (users) {
        this._users = users
    }

    get orders () {
        return this._orders
    }

    get users () {
        return this._users
    }

}
