import React from 'react';
import {Button, Modal} from "react-bootstrap";


const DeleteItemModal = ({show, deleteItemModalShow, deleteItemHandler}) => {

    return (
        <>
            <Modal
                show={show}
                onHide={deleteItemModalShow}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteItemModalShow}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteItemHandler}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteItemModal;