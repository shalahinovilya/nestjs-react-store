import React, {useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";


const DeleteItemModal = observer(({show, deleteItemHandler}) => {

    const {admin} = useContext(Context)

    return (
        <>
            <Modal
                show={show}
                onHide={() => admin.setCurrentItem({})}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => admin.setCurrentItem({})}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteItemHandler}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default DeleteItemModal;