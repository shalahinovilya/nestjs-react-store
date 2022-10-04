import {makeAutoObservable} from "mobx";


export class AdminStore {

    constructor() {
        this._orders = []
        this._users = []
        this._products = []
        makeAutoObservable(this)
    }

    setOrders (orders) {
        this._orders = orders
    }

    setUsers (users) {
        this._users = users
    }

    setProducts (products) {
        this._products = products
    }

    get orders () {
        return this._orders
    }

    get users () {
        return this._users
    }

    get products () {
        return this._products
    }

}
