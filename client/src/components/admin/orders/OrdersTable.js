import React, {useContext, useState} from 'react';
import OrderTr from "./OrderTr";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const OrdersTable = observer(({showDeleteModal}) => {

    const {admin} = useContext(Context)

    const [idEditOrder, setIdEditOrder] = useState(NaN)

    const selectIdEditOrder = async (orderId) => {
        await setIdEditOrder(orderId)
    }

    return (
        <tbody>
        {admin.orders.map((order) => (
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
});

export default OrdersTable;