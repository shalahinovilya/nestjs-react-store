import {createPages} from "./CreatePages";

export const CreatePagination = (props) => {

    let {totalRecords = null, pageLimit = 7, currentPage = null} = props

    pageLimit = typeof pageLimit === 'number' ? pageLimit : 7
    totalRecords = typeof totalRecords === 'number' ? totalRecords : 0

    currentPage = typeof currentPage ==='number' ? currentPage : 1

    const totalPages = Math.ceil(totalRecords / pageLimit)

    const lastIndex = currentPage * pageLimit
    const firstIndex = lastIndex - pageLimit

    const pages = []
    createPages(pages, currentPage, totalPages)

    return {pages, pageLimit, totalPages, totalRecords, lastIndex, firstIndex, currentPage}
};
