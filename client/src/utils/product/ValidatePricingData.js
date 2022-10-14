export const findPricingErrors = async (minPrice, maxPrice) => {
    return !(minPrice > maxPrice || !Number.isNaN(minPrice) || !Number.isNaN(maxPrice) || minPrice < 0 || maxPrice < 0);
}