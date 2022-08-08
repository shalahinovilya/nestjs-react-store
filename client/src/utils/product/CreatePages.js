export const createPages = (pages, currentPage, totalPages) => {

    if (totalPages > 10) {
        if (currentPage > 5) {
            for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                pages.push(i)
                if (i === totalPages) break

            }
        }
        else {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
                if (i === totalPages) break
            }
        }
    }
    else {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
    }
}