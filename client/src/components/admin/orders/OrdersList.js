import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import OrderTr from "./OrderTr";


const OrdersList = ({showDeleteModal}) => {

    const {admin} = useContext(Context)

    const [idEditOrder, setIdEditOrder] = useState(NaN)

    const selectIdEditOrder = async (orderId) => {
        await setIdEditOrder(orderId)
    }

    return (
        <>
            {
                admin.orders.map((order) => (
                        <OrderTr
                            order={order}
                            showDeleteModal={showDeleteModal}
                            selectIdEditOrder={selectIdEditOrder}
                            isEditing={idEditOrder !== order.id}
                            key={order.id}
                        />
                    )
                )
            }
        </>
    )
};

export default OrdersList;