import {makeAutoObservable} from "mobx";


export class AdminStore {

    constructor() {
        this._orders = []
        this._users = []
        this._products = []
        this._currentItem = {}
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

    setCurrentItem (item) {
        this._currentItem = item
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

    get currentItem () {
        return this._currentItem
    }

}
