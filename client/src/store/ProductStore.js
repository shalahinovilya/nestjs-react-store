import {makeAutoObservable} from "mobx";


export class ProductStore {

    constructor() {
        this._products = []
        this._categories = []
        this._page = 1
        this._selectedCategory = {}
        this._sortOrderVars = {
            'From new to old': ['updatedAt', 'DESC'],
            'From old to new': ['updatedAt', 'ASC'],
            'From cheap to expensive': ['price', 'ASC'],
            'From expensive to cheap': ['price', 'DESC'],
        }
        this._selectedSortOrder = 'From new to old'
        this._limit = 8
        this._offset = 0
        this._totalRecords = 0
        this._comments = []
        this._commentsNum = 0
        makeAutoObservable(this)
    }

    setProducts (products) {
        this._products = products
    }

    setCategories (categories) {
        this._categories = categories
    }

    setPage (page) {
        this._page = page
    }

    setOffset (offset) {
        this._offset = offset
    }

    setTotalRecords (totalRecords) {
        this._totalRecords = totalRecords
    }

    setSelectedCategory (selectedCategory) {
        this._selectedCategory = selectedCategory
    }

    setSelectedSortOrder (selectedSortOrder) {
        if (!selectedSortOrder) {
            this._selectedSortOrder = 'From new to old'
            return;
        }
        this._selectedSortOrder = selectedSortOrder
    }

    setComments (comments) {
        this._comments = comments
        this._commentsNum = comments.length
    }

    setCommentsNum(commentsNum) {
        this._commentsNum = commentsNum
    }

    get products () {
        return this._products
    }

    get categories () {
        return this._categories
    }

    get limit () {
        return this._limit
    }

    get page () {
        return this._page
    }

    get totalRecords () {
        return this._totalRecords
    }

    get offset () {
        return this._offset
    }

    get selectedCategory () {
        return this._selectedCategory
    }

    get selectedSortOrder () {
        return this._selectedSortOrder
    }

    get sortOrderVars () {
        return this._sortOrderVars
    }

    get comments () {
        return this._comments
    }

    get commentsNum () {
        return this._commentsNum
    }
}
