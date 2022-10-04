import React, {useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {deleteComment} from "../../http/commentHttp";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const DeleteCommentModal = observer(({show, closeCommentModalHandler, commentId}) => {

    const {product} = useContext(Context)

    const deleteCommentHandler = async () => {
        await deleteComment(commentId).then(() => product.setCommentsNum(0))
        await closeCommentModalHandler()
    }

    return (
        <>
            <Modal
                show={show}
                onHide={closeCommentModalHandler}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the comment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCommentModalHandler}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteCommentHandler}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default DeleteCommentModal;