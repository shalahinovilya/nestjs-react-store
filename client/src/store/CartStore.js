import {makeAutoObservable} from "mobx";


export class CartStore {

    constructor() {
        this._cartProducts = []
        this._categories = []
        this._finalPrice = 0
        this._cartTotalProductsCount = 0
        makeAutoObservable(this)
    }

    setCartProducts(cartProducts) {
        this._cartProducts = cartProducts
    }

    setFinalPrice(finalPrice) {
        this._finalPrice = finalPrice
    }

    setCartTotalProductsCount(cartTotalProductsCount) {
        this._cartTotalProductsCount = cartTotalProductsCount
    }

    setCategories(categories) {
        this._categories = categories
    }

    get cartProducts() {
        return this._cartProducts
    }

    get cartDataCount() {
        return this._cartDataCount
    }

    get finalPrice() {
        return this._finalPrice
    }

    get cartTotalProductsCount() {
        return this._cartTotalProductsCount
    }

    get categories() {
        return this._categories
    }

}
