export async function findMinMaxPrice (data) {
    const arr = []

    for (let object of data) {
        arr.push(object.price)
    }

    return {maxPrice: Math.max(...arr), minPrice:  Math.min(...arr)}
}