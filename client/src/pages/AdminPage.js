import React, {useContext, useState} from 'react';
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

    const [currentItem, setCurrentItem] = useState({})
    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false)

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
        else if (currentItem.type === 'product') {
            await setShowDeleteItemModal(false)
            const res = await deleteProduct(currentItem.id)
            res.status === 200 ? admin.setProducts([]) : console.log(res)
        }
    }

    const deleteItemModalShow = async (item) => {
        await selectCurrentItem(item)
        await setShowDeleteItemModal(!showDeleteItemModal)
    }


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
                        <UsersTable
                            showDeleteModal={deleteItemModalShow}
                        />
                    </Col>
                    <Col>
                        <div className="orders-table-header">Orders</div>
                        <OrdersTable
                            showDeleteModal={deleteItemModalShow}
                        />
                    </Col>
                    <Col>
                        <div className="products-table-header">Products</div>
                        <ProductsTable
                            showDeleteModal={deleteItemModalShow}
                        />
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