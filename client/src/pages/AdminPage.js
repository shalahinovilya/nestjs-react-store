import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import {getAllUsers} from "../http/userHttp";
import {getAllOrders} from "../http/orderHttp";
import UsersTable from "../components/admin/users/UsersTable";
import UsersBlockHeader from "../components/admin/users/UsersBlockHeader";
import OrdersBlock from "../components/admin/orders/OrdersTable";
import OrdersBlockHeader from "../components/admin/orders/OrdersBlockHeader";
import CreateCategoryForm from "../components/admin/CreateCategoryForm";
import '../static/AdminPage.css'
import DeleteItemModal from "../components/admin/DeleteItemModal";

const AdminPage = () => {

    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])
    const [currentItem, setCurrentItem] = useState({})
    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false)

    const createCategory = async (category, categoryDescription) => {
        await createCategory({value: category, description: categoryDescription})
    }

    const selectCurrentItem = async (item) => {
        await setCurrentItem({})
        await setCurrentItem(item)
    }

    const deleteItemModalShow = async (item) => {
        await selectCurrentItem(item)
        await setShowDeleteItemModal(!showDeleteItemModal)
    }

    const getUsers = async () => {
        const users = await getAllUsers()
        await setUsers(users)
    }

    const getOrders = async () => {
        const orders = await getAllOrders()
        await setOrders(orders)
    }

    useEffect(() => {
        getUsers()
        getOrders()
    }, [])

    return (
        <div className="admin-block">
            <Container style={{border: '1px solid black'}}>
                <Row style={{textAlign: 'center'}}  md={1}>
                    <Col md={{offset: 5, span: 3}}>
                        <CreateCategoryForm createCategory={createCategory}/>
                    </Col>
                    <hr/>
                    <Col style={{marginTop: 40}}>
                        <div className="users-table-header">Users</div>
                        <Table striped bordered hover size="sm">
                            <UsersBlockHeader />
                            <UsersTable
                                userList={users}
                                showDeleteModal={deleteItemModalShow}
                            />
                        </Table>
                    </Col>
                    <Col style={{marginTop: 40}}>
                        <div className="orders-table-header">Orders</div>
                        <Table striped bordered hover size="sm">
                            <OrdersBlockHeader/>
                            <OrdersBlock
                                orderList={orders}
                                showDeleteModal={deleteItemModalShow}
                            />
                        </Table>
                    </Col>
                </Row>
            </Container>
            <DeleteItemModal
                show={showDeleteItemModal}
                deleteItemModalShow={deleteItemModalShow}
                item={currentItem}
            />
        </div>
    );
};

export default AdminPage;