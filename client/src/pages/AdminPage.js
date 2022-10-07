import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {deleteOrder} from "../http/orderHttp";
import {createCategory} from "../http/categoryHttp";
import {deleteProduct} from "../http/productHttp";
import {deleteUser} from "../http/userHttp";
import UsersTable from "../components/admin/users/UsersTable";
import OrdersTable from "../components/admin/orders/OrdersTable";
import CreateCategoryForm from "../components/admin/CreateCategoryForm";
import DeleteItemModal from "../components/admin/DeleteItemModal";
import ProductsTable from "../components/admin/products/ProductsTable";
import '../static/AdminPage.css'
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const AdminPage = observer(() => {

    const {admin} = useContext(Context)

    const [showDeleteItemModal, setShowDeleteItemModal] = useState(true)

    const createCategoryHandler = async (category, categoryDescription) => {
        await createCategory({value: category, description: categoryDescription})
    }

    const deleteItemHandler = async () => {
        if (admin.currentItem.type === 'user') {
            const res = await deleteUser(admin.currentItem.id)
            res.status === 200 ? admin.setUsers([]) : console.log(res)
            admin.setCurrentItem({})
        }
        else if (admin.currentItem.type === 'order') {
            const res = await deleteOrder(admin.currentItem.id)
            res.status === 200 ? admin.setOrders([]) : console.log(res)
            admin.setCurrentItem({})
        }
        else if (admin.currentItem.type === 'product') {
            const res = await deleteProduct(admin.currentItem.id)
            res.id ? await admin.setProducts([]) : console.log(res)
            await admin.setCurrentItem({})
        }
    }

    const deleteItemModalShow = async () => {
        await setShowDeleteItemModal(!showDeleteItemModal)
    }

    useEffect(() => {
        deleteItemModalShow()
    }, [admin.currentItem])

    return (
        <div className="admin-block">
            <Container>
                <Row style={{textAlign: 'center'}}  md={1}>
                    <Col md={{offset: 5, span: 3}}>
                        <CreateCategoryForm createCategory={createCategoryHandler}/>
                    </Col>
                    <hr/>
                    <Col>
                        <div className="users-table-header">Users</div>
                        <UsersTable/>
                    </Col>
                    <Col>
                        <div className="orders-table-header">Orders</div>
                        <OrdersTable/>
                    </Col>
                    <Col>
                        <div className="products-table-header">Products</div>
                        <ProductsTable/>
                    </Col>
                </Row>
            </Container>
            <DeleteItemModal
                show={showDeleteItemModal}
                deleteItemHandler={deleteItemHandler}
            />
        </div>
    );
});

export default AdminPage;