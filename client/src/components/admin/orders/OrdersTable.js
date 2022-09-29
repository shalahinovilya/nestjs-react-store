import React, {useState} from 'react';
import OrderTr from "./OrderTr";

const OrdersTable = ({orderList, showDeleteModal}) => {

    const [idEditOrder, setIdEditOrder] = useState(NaN)

    const selectIdEditOrder = async (orderId) => {
        await setIdEditOrder(orderId)
    }

    return (
        <tbody>
        {orderList.map((order) => (
            <OrderTr
                order={order}
                showDeleteModal={showDeleteModal}
                selectIdEditOrder={selectIdEditOrder}
                isEditing={idEditOrder !== order.id}
                key={order.id}
            />
        ) )}
        </tbody>
    );
};

export default OrdersTable;