import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {deleteProduct} from "../../http/productHttp";
import {useNavigate} from "react-router-dom";

const DeleteProductModal = ({show, closeProductModalHandler, productId}) => {

    const navigate = useNavigate()

    const deleteProductHandler = async () => {
        await deleteProduct(productId).then(() => navigate('/products/'))
    }

    return (
        <>
            <Modal
                show={show}
                onHide={closeProductModalHandler}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeProductModalHandler}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteProductHandler}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteProductModal;