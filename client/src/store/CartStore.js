import {makeAutoObservable} from "mobx";


export class CartStore {

    constructor() {
        this.cartProducts = []
        this.categories = []
        this.cartDataCount = 0
        this.finalPrice = 0
        this.cartTotalProductsCount = 0
        makeAutoObservable(this)
    }

    setCartProducts(cartProducts) {
        this.cartProducts = cartProducts
    }

    setCartDataCount(cartDataCount) {
        this.cartDataCount = cartDataCount
    }

    setFinalPrice(finalPrice) {
        this.finalPrice = finalPrice
    }

    setCartTotalProductsCount(cartTotalProductsCount) {
        this.cartTotalProductsCount = cartTotalProductsCount
    }

    setCategories(categories) {
        this.categories = categories
    }

    getCartProducts() {
        return this.cartProducts
    }

    getCartDataCount() {
        return this.cartDataCount
    }

    getFinalPrice() {
        return this.finalPrice
    }

    getCartTotalProductsCount() {
        return this.cartTotalProductsCount
    }

    getCategories() {
        return this.categories
    }

}
