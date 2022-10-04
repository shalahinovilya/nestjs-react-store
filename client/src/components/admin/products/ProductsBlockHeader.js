import React from 'react';

const ProductsBlockHeader = () => {
    return (
        <thead>
        <tr>
            <th>
                product id
            </th>
            <th>
                category id
            </th>
            <th>
                user id
            </th>
            <th>
                title
            </th>
            <th>
                description
            </th>
            <th>
                price
            </th>
            <th>
                createdAt
            </th>
            <th>
                updatedAt
            </th>
        </tr>
        </thead>
    );
};

export default ProductsBlockHeader;