import {makeAutoObservable} from "mobx";


export class ProductStore {

    constructor() {
        this.products = []
        this.categories = []
        this.limit = 3
        this.offset = 0
        makeAutoObservable(this)
    }

    setProducts(products) {
        this.products = products
    }

    setCategories(categories) {
        this.categories = categories
    }

    setOffset(offset) {
        this.offset = offset
    }

    getProducts() {
        return this.products
    }

    getCategories() {
        return this.categories
    }

    getLimit() {
        return this.limit
    }

    getOffset() {
        return this.offset
    }
}
