import React from 'react';

const OrdersBlockHeader = () => {
    return (
        <thead>
            <tr>
                <th>
                    order id
                </th>
                <th>
                    user id
                </th>
                <th>
                    cart id
                </th>
                <th>
                    first name
                </th>
                <th>
                    last name
                </th>
                <th>
                    phone
                </th>
                <th>
                    delivery type
                </th>
                <th>
                    address
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

export default OrdersBlockHeader;