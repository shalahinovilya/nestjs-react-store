import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner, Table} from "react-bootstrap";
import {deleteUser, getAllUsers} from "../http/userHttp";
import {deleteOrder, getAllOrders} from "../http/orderHttp";
import UsersTable from "../components/admin/users/UsersTable";
import UsersBlockHeader from "../components/admin/users/UsersBlockHeader";
import OrdersTable from "../components/admin/orders/OrdersTable";
import OrdersBlockHeader from "../components/admin/orders/OrdersBlockHeader";
import CreateCategoryForm from "../components/admin/CreateCategoryForm";
import '../static/AdminPage.css'
import DeleteItemModal from "../components/admin/DeleteItemModal";
import {createCategory} from "../http/categoryHttp";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const AdminPage = observer(() => {

    const {admin} = useContext(Context)

    const [currentItem, setCurrentItem] = useState({})
    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false)
    const [isUsersLoading, setIsUsersLoading] = useState(true)
    const [isOrdersLoading, setIsOrdersLoading] = useState(true)

    const createCategoryHandler = async (category, categoryDescription) => {
        await createCategory({value: category, description: categoryDescription})
    }

    const selectCurrentItem = async (item) => {
        await setCurrentItem({})
        await setCurrentItem(item)
    }

    const deleteItemHandler = async () => {
        if (currentItem.type === 'user') {
            await setShowDeleteItemModal(false)
            const res = await deleteUser(currentItem.id)
            res.status === 200 ? admin.setUsers([]) : console.log(res)
        }
        else if (currentItem.type === 'order') {
            await setShowDeleteItemModal(false)
            const res = await deleteOrder(currentItem.id)
            res.status === 200 ? admin.setOrders([]) : console.log(res)
        }
    }

    const deleteItemModalShow = async (item) => {
        await selectCurrentItem(item)
        await setShowDeleteItemModal(!showDeleteItemModal)
    }

    const getUsers = async () => {
        await setIsUsersLoading(true)
        await getAllUsers()
            .then(data => admin.setUsers(data))
            .finally(() => setIsUsersLoading(false))
    }

    const getOrders = async () => {
        await setIsOrdersLoading(true)
        await getAllOrders()
            .then(data => admin.setOrders(data))
            .finally(() => setIsOrdersLoading(false))
    }

    useEffect(() => {
        getUsers()
    }, [admin.users.length])

    useEffect(() => {
        getOrders()
    }, [admin.orders.length])

    return (
        <div className="admin-block">
            <Container>
                <Row style={{textAlign: 'center'}}  md={1}>
                    <Col md={{offset: 5, span: 3}}>
                        <CreateCategoryForm createCategory={createCategoryHandler}/>
                    </Col>
                    <hr/>
                    <Col style={{marginTop: 40}}>
                        <div className="users-table-header">Users</div>
                        {isUsersLoading ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>) : (
                            <Table striped bordered hover size="sm">
                                <UsersBlockHeader/>
                                <UsersTable
                                    showDeleteModal={deleteItemModalShow}
                                />
                            </Table>
                        )}
                    </Col>
                    <Col style={{marginTop: 40}}>
                        <div className="orders-table-header">Orders</div>
                        {isOrdersLoading ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>) : (
                            <Table striped bordered hover size="sm">
                                <OrdersBlockHeader/>
                                <OrdersTable
                                    showDeleteModal={deleteItemModalShow}
                                />
                            </Table>
                        )}
                    </Col>
                </Row>
            </Container>
            <DeleteItemModal
                show={showDeleteItemModal}
                deleteItemModalShow={deleteItemModalShow}
                deleteItemHandler={deleteItemHandler}
            />
        </div>
    );
});

export default AdminPage;