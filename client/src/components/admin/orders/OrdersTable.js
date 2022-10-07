import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import TableLoader from "../TableLoader";
import {Table} from "react-bootstrap";
import OrdersList from "./OrdersList";
import OrdersBlockHeader from "./OrdersBlockHeader";
import {getAllOrders} from "../../../http/orderHttp";

const OrdersTable = () => {

    const {admin} = useContext(Context)

    const [isLoading, setIsLoading] = useState(false)

    const getOrders = async () => {
        await setIsLoading(true)
        await getAllOrders()
            .then(data => admin.setOrders(data))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getOrders()
    }, [admin.orders.length])

    if (!admin.orders.length) {
        return <div>No Data</div>
    }

    return (
        <>
            {isLoading ? (<TableLoader/>) : (
                <Table striped bordered hover size="sm">
                    <OrdersBlockHeader/>
                    <tbody>
                    <OrdersList/>
                    </tbody>
                </Table>
            )}
        </>
    )
};

export default OrdersTable;