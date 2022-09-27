import React, {useState} from 'react';
import OrderTr from "./OrderTr";

const OrdersBlock = ({orderList, showDeleteModal}) => {

    return (
        <tbody>
        {orderList.map((order) => (
            <OrderTr
                order={order}
                showDeleteModal={showDeleteModal}
                key={order.id}
            />
        ) )}
        </tbody>
    );
};

export default OrdersBlock;